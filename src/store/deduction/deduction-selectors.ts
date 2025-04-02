// types
import { createSelector } from "@reduxjs/toolkit";
import { AppStoreType } from "src/types/store-types";
import {
  DeductionEntry,
  DeductionReducerType,
  RentEntry,
  ActionEntry,
  RentOption,
  DeductionAmountBreakup,
} from "src/types/deduction-types";

export const selectDeductionActionEntry = (store: AppStoreType): ActionEntry =>
  store.deduction.actionEntry;
export const selectDeduction = (store: AppStoreType): DeductionReducerType =>
  store.deduction;
export const selectRentDeduction = (store: AppStoreType): RentEntry =>
  store.deduction.entries.rent; 
export const selectDeductionSection24 = (store: AppStoreType): any =>
  store.deduction.entries.section24;
export const selectSection80CDeduction = (
  store: AppStoreType
): DeductionEntry => store.deduction.entries.section80C;
export const selectChapter6Deduction = (store: AppStoreType): DeductionEntry =>
  store.deduction.entries.chapter6;
export const selectOtherDeduction = (store: AppStoreType): DeductionEntry =>
  store.deduction.entries.others;

export const selectRentOptions = (store: AppStoreType): RentOption[] =>
  store.deduction.entries.rent.options;
export const selectRentDeductedAmount = (store: AppStoreType): number =>
  store.deduction.entries.rent.deductedAmount;

export const selectSection24DeductedAmount = (store: AppStoreType): number =>
  store.deduction.entries.section24.deductedAmount;
export const select80CDeductedAmount = (store: AppStoreType): number =>
  store.deduction.entries.section80C.deductedAmount;
export const selectChapterVIDeductedAmount = (store: AppStoreType): number =>
  store.deduction.entries.chapter6.deductedAmount;
export const selectOthersDeductedAmount = (store: AppStoreType): number =>
  store.deduction.entries.others.deductedAmount;

export const selectTotalDeduction = createSelector(
  [
    selectRentDeductedAmount,
    selectSection24DeductedAmount,
    select80CDeductedAmount,
    selectChapterVIDeductedAmount,
    selectOthersDeductedAmount,
  ],
  (rentDeduction, deductionSection24, deduction80C, deductionChapter6) =>
    rentDeduction + deductionSection24 + deduction80C + deductionChapter6
);
export const selectDeductionAmountBreakup = createSelector(
  [
    selectRentDeductedAmount,
    selectSection24DeductedAmount,
    select80CDeductedAmount,
    selectChapterVIDeductedAmount,
    selectOthersDeductedAmount,
  ],
  (
    rentDeduction,
    deductionSection24,
    deduction80C,
    deductionChapter6,
    deductionOthers
  ): DeductionAmountBreakup => ({
    rent: rentDeduction,
    section24: deductionSection24,
    section80C: deduction80C,
    chapter6: deductionChapter6,
    others: deductionOthers,
  })
);
