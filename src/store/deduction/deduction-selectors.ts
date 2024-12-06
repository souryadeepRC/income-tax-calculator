// types
import { createSelector } from "@reduxjs/toolkit";
import { AppStoreType } from "src/store/reducer-types";
import {
  Deduction80CType,
  DeductionByChapter6Type,
  DeductionByRent,
  DeductionReducerType,
  EditableRentEntry,
} from "src/types/deduction-types";

export const selectDeduction = (store: AppStoreType): DeductionReducerType =>
  store.deduction;
export const selectRentDeduction = (store: AppStoreType): DeductionByRent =>
  store.deduction.rent;
export const selectSection24 = (store: AppStoreType): number =>
  store.deduction.section24;
export const selectDeduction80C = (store: AppStoreType): Deduction80CType =>
  store.deduction.deduction80C;
export const selectDeductionChapter6 = (
  store: AppStoreType
): DeductionByChapter6Type => store.deduction.deductionByChapter6;

export const selectRentCollections = (store: AppStoreType) =>
  store.deduction.rent.collections;
export const selectRentDeductedAmount = (store: AppStoreType) =>
  store.deduction.rent.deductedAmount;
export const selectEditableRentEntry = (
  store: AppStoreType
): EditableRentEntry => {
  const { isEditable, editableEntryId } = store.deduction.rent;
  return { isEditable, editableEntryId };
};

export const selectDeductionBreakup = createSelector(
  [
    selectRentDeductedAmount,
    selectSection24,
    selectDeduction80C,
    selectDeductionChapter6,
  ],
  (deductedAmount, section24Deduction, deduction80C, deductionChapter6) => {
    return {
      rentDeduction: deductedAmount,
      section24Deduction: 5000,
      deduction80C: 5000,
      deductionChapter6: 5000,
      total: 20000,
    };
  }
);
