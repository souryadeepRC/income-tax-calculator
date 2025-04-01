import { useEffect } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
// service
import dbService from "src/service/Database";
// store
import { loginUser } from "src/store/auth/auth-actions";
import { selectUserName, selectIsLoggedIn } from "src/store/auth/auth-selectors";
import { loadIncomeDetails } from "src/store/income/income-actions";
import { loadDeduction } from "src/store/deduction/deduction-actions";

const useUserDetails = (): void => {
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

  const {
    isFetched: isIncomeFetched,
    data: incomeData,
    isSuccess: isIncomeSuccess,
  } = useQuery({
    queryKey: ["user-income-details"],
    queryFn: () => dbService.getAllDetails("income"),
    retry: 0,
    enabled: !!username && !isLoggedIn,
  });
  const {
    isFetched: isDeductionFetched,
    data: deductionData,
    isSuccess: isDeductionSuccess,
  } = useQuery({
    queryKey: ["user-deduction-details"],
    queryFn: () => dbService.getAllDetails("deduction"),
    retry: 0,
    enabled: !!username && !isLoggedIn,
  });

  useEffect(() => {
    if (!isIncomeFetched || !isIncomeSuccess || !incomeData) return;
    const modifiedIncome = incomeData.documents.map((option) => ({
      id: option?.$id,
      category: option.category,
      amount: option.amount,
      group: option.group,
    }));
    dispatch(loadIncomeDetails(modifiedIncome));
  }, [isIncomeFetched, isIncomeSuccess, incomeData]);

  useEffect(() => {
    if (!isDeductionFetched || !isDeductionSuccess || !deductionData) return;
    const modifiedDeduction = deductionData.documents.map((option) => ({
      id: option?.$id,
      type: option.type,
      category: option.category,
      amount: option.amount,
      maxLimit: option.maxLimit,
      duration: option.duration,
    }));
    dispatch(loadDeduction(modifiedDeduction));
  }, [isDeductionFetched, isDeductionSuccess, deductionData]);

  useEffect(() => {
    let timer: any;

    if (isIncomeFetched && isDeductionFetched) {
      timer = setTimeout(() => {
        dispatch(loginUser());
      }, 1000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [isIncomeFetched, isDeductionFetched]);
};

export default useUserDetails;
