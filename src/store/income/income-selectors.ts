// types
import { createSelector } from "@reduxjs/toolkit";
import { AppStoreType } from "src/store/reducer-types";
import { IncomeComponent } from "src/types/income-types";

export const selectIncome = (store: AppStoreType): any => store.income.income;
export const selectSalary = (store: AppStoreType): number => 0;
export const selectSalaryIncome = (
  store: AppStoreType
): Record<string, number> => store.income.income.salary;
export const selectExtraIncome = (
  store: AppStoreType
): Record<string, number> => store.income.income.extra;
export const selectEditableIncome = (store: AppStoreType): IncomeComponent =>
  store.income.editableIncome;
export const selectBasic = (store: AppStoreType): number =>
  store.income.income.salary?.["basic"] || 0;
export const selectHra = (store: AppStoreType): number =>
  store.income.income.salary?.["hra"] || 0;
export const selectPf = (store: AppStoreType): number =>
  store.income.income.salary?.["pf"] || 0;
export const selectTaxDetails = (store: AppStoreType): any => store.income.tax;
export const selectTaxChoice = (store: AppStoreType): any =>
  store.income.tax.choice;
export const selectIncomeBreakdown: (store: AppStoreType) => {
  salary: number;
  extra: number;
  total: number;
} = createSelector([selectSalaryIncome, selectExtraIncome], (salary, extra) => {
  const totalSalary = Object.values(salary).reduce(
    (acc: number, amount: number) => acc + amount,
    0
  );
  const totalExtra = Object.values(extra).reduce(
    (acc: number, amount: number) => acc + amount,
    0
  );

  return {
    salary: totalSalary,
    extra: totalExtra,
    total: totalSalary + totalExtra,
  };
});
export const selectAnnualIncome: (store: AppStoreType) => number =
  createSelector([selectSalaryIncome, selectExtraIncome], (salary, extra) => {
    const totalSalary = Object.values(salary).reduce(
      (acc: number, amount: number) => acc + amount,
      0
    );
    const totalExtra = Object.values(extra).reduce(
      (acc: number, amount: number) => acc + amount,
      0
    );

    return totalSalary + totalExtra;
  });
