// types
import { AppStoreType } from "src/store/reducer-types";
import {
  Deduction80CType,
  DeductionByChapter6Type,
  DeductionReducerType,
  RentDeductionType,
} from "src/types/deduction-types";

export const selectDeduction = (store: AppStoreType): DeductionReducerType =>
  store.deduction;
export const selectRentDeduction = (store: AppStoreType): RentDeductionType =>
  store.deduction.rent;
export const selectSection24 = (store: AppStoreType): number =>
  store.deduction.section24;
export const selectDeduction80C = (store: AppStoreType): Deduction80CType =>
  store.deduction.deduction80C;
export const selectDeductionChapter6 = (store: AppStoreType): DeductionByChapter6Type =>
  store.deduction.deductionByChapter6;
