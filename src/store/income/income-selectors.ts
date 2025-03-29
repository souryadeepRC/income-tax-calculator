// types
import { createSelector } from "@reduxjs/toolkit";
import { AppStoreType } from "src/types/store-types";
import {
  ActionEntry,
  IncomeDeleteEntry,
  IncomeGroup,
  IncomeOption,
  IncomeReducerType,
} from "src/types/income-types";

export const selectIncome = (store: AppStoreType): IncomeReducerType =>
  store.income;
export const selectIncomeActionEntry = (store: AppStoreType): ActionEntry =>
  store.income.actionEntry;
export const selectIncomeOptions = (store: AppStoreType): IncomeOption[] =>
  store.income.options;

export const selectSalaryIncome = createSelector(
  [selectIncomeOptions],
  (incomeOptions) => incomeOptions.filter((income) => income.group === "salary")
);
export const selectExtraIncome = createSelector(
  [selectIncomeOptions],
  (incomeOptions) => incomeOptions.filter((income) => income.group === "extra")
);

export const selectOverallIncomeAmount = (store: AppStoreType): number =>
  store.income.overallAmount;

export const selectRentEligibleDetails = createSelector(
  [selectSalaryIncome],
  (salaryIncome) =>
    salaryIncome.reduce(
      (acc, income) => {
        if (income.category.toLowerCase() === "basic") {
          return {
            ...acc,
            basic: income.amount,
          };
        } else if (income.category.toLowerCase() === "hra") {
          return {
            ...acc,
            hra: income.amount,
          };
        }
        return acc;
      },
      { basic: 0, hra: 0 }
    )
);
