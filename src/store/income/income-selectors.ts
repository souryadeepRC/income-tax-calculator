// types
import { AppStoreType } from "src/store/reducer-types";

export const selectSalary = (store: AppStoreType): number =>
  store.income.salary;
export const selectBasic = (store: AppStoreType): number => store.income.basic;
export const selectHra = (store: AppStoreType): number => store.income.hra;
export const selectPf = (store: AppStoreType): number => store.income.pf;
