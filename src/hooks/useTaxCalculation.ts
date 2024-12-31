import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// actions
import { updateTaxDetails } from "src/store/tax/tax-actions";
// selectors
import { selectDeduction } from "src/store/deduction/deduction-selectors";
import {
  selectOverallIncomeAmount,
  selectSalaryIncome,
} from "src/store/income/income-selectors";
// types
import { AppDispatch } from "src/store/reducer-types";
import { DeductionReducerType } from "src/types/deduction-types";
// utils
import { calculateTax } from "src/utils/tax-calculation";

export const useTaxCalculation = () => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const salaryIncome = useSelector(selectSalaryIncome);
  const overallAmount = useSelector(selectOverallIncomeAmount);
  const deduction: DeductionReducerType = useSelector(selectDeduction);

  const taxBreakup = useMemo(
    () => calculateTax(salaryIncome, overallAmount, deduction),
    [salaryIncome, overallAmount, deduction],
  );

  // effects
  useEffect(() => {
    dispatch(updateTaxDetails(taxBreakup));
  }, [dispatch, taxBreakup]);
};
