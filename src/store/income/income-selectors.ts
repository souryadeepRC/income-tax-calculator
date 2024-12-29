// types
import { createSelector } from "@reduxjs/toolkit";
import { AppStoreType } from "src/store/reducer-types";
import { IncomeOption, IncomeReducerType } from "src/types/income-types";

export const selectIncome = (store: AppStoreType): IncomeReducerType =>
  store.income;
export const selectIncomeOptions = (store: AppStoreType): IncomeOption[] =>
  store.income.options;
export const selectEditableIncomeEntryId = (store: AppStoreType): string =>
  store.income.editableEntryId;
export const selectEditableIncomeOption: (store: AppStoreType) => IncomeOption =
  createSelector(
    [selectEditableIncomeEntryId, selectIncomeOptions],
    (entryId, incomeOptions) => {
      const editableIncome = incomeOptions.find(
        (income) => income.id === entryId
      );
      if (!editableIncome) return { amount: 0, label: "", category: "salary" };
      return editableIncome;
    }
  );
export const selectSalaryIncome = createSelector(
  [selectIncomeOptions],
  (incomeOptions) => {
    return incomeOptions.filter((income) => income.category === "salary");
  }
);
export const selectExtraIncome = createSelector(
  [selectIncomeOptions],
  (incomeOptions) => {
    return incomeOptions.filter((income) => income.category === "extra");
  }
);

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
