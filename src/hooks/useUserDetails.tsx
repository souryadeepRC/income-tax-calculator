import { useEffect } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
// service
import { loginUser } from "src/store/auth/auth-actions";
import dbService from "src/service/Database";
import { selectUserName } from "src/store/auth/auth-selectors";
import { loadIncomeDetails } from "src/store/income/income-actions";

const useUserDetails = (): void => {
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);

  const {
    isFetched: isIncomeFetched,
    data: incomeData,
    isSuccess: isIncomeSuccess,
  } = useQuery({
    queryKey: ["user-income-details"],
    queryFn: () => dbService.getAllDetails("income"),
    retry: 0,
    enabled: !!username,
  });
  const {
    isFetched: isDeductionFetched,
    data: deductionData,
    isSuccess: isDeductionSuccess,
  } = useQuery({
    queryKey: ["user-deduction-details"],
    queryFn: () => dbService.getAllDetails("deduction"),
    retry: 0,
    enabled: !!username,
  });

  useEffect(() => {
    let timer: any;
    if (isIncomeFetched && isIncomeSuccess) {
      const modifiedIncome = incomeData.documents.map((option) => ({
        id: option?.$id,
        category: option.category,
        amount: option.amount,
        group: option.group,
      }));
      dispatch(loadIncomeDetails(modifiedIncome));
    }

    if (isDeductionFetched && isDeductionSuccess) {
      console.log("Load Deduction Details", deductionData);
    }
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
