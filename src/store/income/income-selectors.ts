// types
import { AppStoreType } from "src/store/reducer-types";
import { IncomeReducerType } from "src/types/income-types";

export const selectIncome = (store: AppStoreType): IncomeReducerType =>
  store.income;
export const selectSalary = (store: AppStoreType): number =>
  store.income.salary;
export const selectBasic = (store: AppStoreType): number => store.income.basic;
export const selectHra = (store: AppStoreType): number => store.income.hra;
export const selectPf = (store: AppStoreType): number => store.income.pf;
