// types
import { createSelector } from "@reduxjs/toolkit";
import { AppStoreType } from "src/store/reducer-types";
import { IncomeOption, IncomeReducerType } from "src/types/income-types";

export const selectIncome = (store: AppStoreType): IncomeReducerType =>
  store.income;

export const selectSalaryIncome = (store: AppStoreType): IncomeOption[] =>
  store.income.options.filter((income) => income.category === "salary");

export const selectExtraIncome = (store: AppStoreType): IncomeOption[] =>
  store.income.options.filter((income) => income.category === "extra");

export const selectOverallIncomeAmount = (store: AppStoreType): number =>
  store.income.overallAmount;

export const selectRentEligibleDetails = createSelector(
  [selectSalaryIncome],
  (salaryIncome) => {
    return salaryIncome.reduce(
      (acc, income) => {
        if (income.label.toLowerCase() === "basic") {
          return {
            ...acc,
            basic: income.amount,
          };
        } else if (income.label.toLowerCase() === "hra") {
          return {
            ...acc,
            hra: income.amount,
          };
        }
        return acc;
      },
      { basic: 0, hra: 0 }
    );
  }
);
