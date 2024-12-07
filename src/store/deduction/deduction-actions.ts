// types
import { ReducerActionPayloadType } from "src/store/reducer-types";
import {
  DeductionByChapter6Type,
  DeductionType80C,
  RentDeductionType,
  RentEntry,
} from "src/types/deduction-types";
// constants
import {
  SET_RENT_DEDUCTED_AMOUNT,
  RESET_EDIT_RENT_ENTRY,
  EDIT_RENT_ENTRY,
  SAVE_RENT_ENTRY,
  DELETE_RENT_ENTRY,
  UPDATE_80C_DEDUCTION,
  UPDATE_CHAPTER_6_DEDUCTION,
  UPDATE_RENT_DEDUCTION,
  UPDATE_SECTION_24_DEDUCTION,
} from "./deduction-constants";
export const editRentEntry = (payload?: string) => {
  return { type: EDIT_RENT_ENTRY, payload };
};
export const resetEditRentEntry = () => {
  return { type: RESET_EDIT_RENT_ENTRY };
};
export const saveRentEntry = (payload: RentEntry) => {
  return { type: SAVE_RENT_ENTRY, payload };
};
export const deleteRentEntry = (payload: string) => {
  return { type: DELETE_RENT_ENTRY, payload };
};
export const setRentDeductedAmount = (payload: number) => {
  return { type: SET_RENT_DEDUCTED_AMOUNT, payload };
};
export const updateRentDeduction = (
  payload: RentDeductionType
): ReducerActionPayloadType => {
  return {
    type: UPDATE_RENT_DEDUCTION,
    payload,
  };
};
export const updateSection24Deduction = (
  payload: number
): ReducerActionPayloadType => {
  return {
    type: UPDATE_SECTION_24_DEDUCTION,
    payload,
  };
};
export const update80CDeduction = (
  payload: DeductionType80C | { providentFund: number }
): ReducerActionPayloadType => {
  return {
    type: UPDATE_80C_DEDUCTION,
    payload,
  };
};
export const updateChapter6Deduction = (
  payload: DeductionByChapter6Type
): ReducerActionPayloadType => {
  return {
    type: UPDATE_CHAPTER_6_DEDUCTION,
    payload,
  };
};
