import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// actions
// selectors
import { selectTotalDeduction } from "src/store/deduction/deduction-selectors";
import {
  selectOverallIncomeAmount,
  selectSalaryIncome,
} from "src/store/income/income-selectors";
// types
import { AppDispatch } from "src/types/store-types";
import { TaxBreakup } from "src/types/tax-types";
// utils
import { calculateTax } from "src/utils/tax-calculation";

export const useTaxCalculation = (): TaxBreakup => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const salaryIncome = useSelector(selectSalaryIncome);
  const overallAmount = useSelector(selectOverallIncomeAmount);
  const deductedAmount = useSelector(selectTotalDeduction);

  const taxBreakup = useMemo(
    () => calculateTax(salaryIncome, overallAmount, deductedAmount),
    [salaryIncome, overallAmount, deductedAmount]
  );

  // effects
  return taxBreakup;
};
