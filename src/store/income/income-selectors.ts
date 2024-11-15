// types
import { AppStoreType } from "src/store/reducer-types";

export const selectIncome = (store: AppStoreType): any => store.income.income;
export const selectSalary = (store: AppStoreType): number =>
  store.income.income.salary;
export const selectBasic = (store: AppStoreType): number =>
  store.income.income.basic;
export const selectHra = (store: AppStoreType): number =>
  store.income.income.hra;
export const selectPf = (store: AppStoreType): number => store.income.income.pf;
export const selectTaxDetails = (store: AppStoreType): any => store.income.tax;
export const selectTaxChoice = (store: AppStoreType): any => store.income.tax.choice;
