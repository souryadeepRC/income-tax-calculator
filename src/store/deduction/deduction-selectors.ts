// types
import { createSelector } from "@reduxjs/toolkit";
import { AppStoreType } from "src/types/store-types";
import {
  DeductionByRent,
  DeductionReducerType,
  EditableRentEntry,
  DeductionOption,
  DeductionSection24,
  RentEntry,
  ActionEntry,
} from "src/types/deduction-types";

export const selectDeductionActionEntry = (store: AppStoreType): ActionEntry =>
  store.deduction.actionEntry;
export const selectDeduction = (store: AppStoreType): DeductionReducerType =>
  store.deduction;
export const selectRentDeduction = (store: AppStoreType): DeductionByRent =>
  store.deduction.rent;
export const selectDeductionSection24 = (store: AppStoreType): any =>
  store.deduction.section24;
export const selectSection80CDeduction = (
  store: AppStoreType
): DeductionOption => store.deduction.section80C;
export const selectChapter6Deduction = (store: AppStoreType): DeductionOption =>
  store.deduction.chapter6;

export const selectRentOptions = (store: AppStoreType): RentEntry[] =>
  store.deduction.rent.options;
export const selectRentDeductedAmount = (store: AppStoreType): number =>
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
  store.deduction.section80C.deductedAmount;
export const selectChapterVIDeductedAmount = (store: AppStoreType): number =>
  store.deduction.chapter6.deductedAmount;

export const selectStandardDeduction = (store: AppStoreType) =>
  store.deduction.standardDeduction;
export const selectTotalDeduction = createSelector(
  [
    selectRentDeductedAmount,
    selectSection24DeductedAmount,
    select80CDeductedAmount,
    selectChapterVIDeductedAmount,
  ],
  (rentDeduction, deductionSection24, deduction80C, deductionChapter6) =>
    rentDeduction + deductionSection24 + deduction80C + deductionChapter6
);
