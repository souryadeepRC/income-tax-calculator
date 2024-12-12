// types
import { createSelector } from "@reduxjs/toolkit";
import { AppStoreType } from "src/store/reducer-types";
import {
  DeductionByRent,
  DeductionReducerType,
  EditableRentEntry,
  DeductionOption,
  DeductionSection24,
} from "src/types/deduction-types";

export const selectDeduction = (store: AppStoreType): DeductionReducerType =>
  store.deduction;
export const selectRentDeduction = (store: AppStoreType): DeductionByRent =>
  store.deduction.rent;
export const selectDeductionSection24 = (
  store: AppStoreType
): DeductionSection24 => store.deduction.section24;
export const selectDeduction80C = (store: AppStoreType): DeductionOption =>
  store.deduction.deduction80C;
export const selectDeductionChapter6 = (store: AppStoreType): DeductionOption =>
  store.deduction.deductionByChapter6;

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

export const selectSection24DeductedAmount = (store: AppStoreType): number =>
  store.deduction.section24.deductedAmount;
export const select80CDeductedAmount = (store: AppStoreType): number =>
  store.deduction.deduction80C.deductedAmount;
export const selectChapterVIDeductedAmount = (store: AppStoreType): number =>
  store.deduction.deductionByChapter6.deductedAmount;

export const selectDeductionBreakup = createSelector(
  [
    selectRentDeductedAmount,
    selectSection24DeductedAmount,
    select80CDeductedAmount,
    selectChapterVIDeductedAmount,
  ],
  (rentDeduction, deductionSection24, deduction80C, deductionChapter6) => {
    return {
      rentDeduction,
      deductionSection24,
      deduction80C,
      deductionChapter6,
      total:
        rentDeduction + deductionSection24 + deduction80C + deductionChapter6,
    };
  }
);
