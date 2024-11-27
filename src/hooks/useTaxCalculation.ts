import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// actions
import { updateTaxDetails } from "src/store/income/income-actions";
// selectors
import { selectDeduction } from "src/store/deduction/deduction-selectors";
import { selectIncomeBreakdown, selectSalaryIncome } from "src/store/income/income-selectors";
// types
import { AppDispatch } from "src/store/reducer-types";
import { DeductionReducerType } from "src/types/deduction-types";
// utils
import { calculateTax } from "src/utils/tax-calculation";

export const useTaxCalculation = () => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const salaryIncome = useSelector(selectSalaryIncome);
  const { total } = useSelector(selectIncomeBreakdown);
  const deduction: DeductionReducerType = useSelector(selectDeduction);

  // effects
  useEffect(() => {
    dispatch(updateTaxDetails(calculateTax(salaryIncome,total, deduction)));
  }, [total, deduction, dispatch]);
};
