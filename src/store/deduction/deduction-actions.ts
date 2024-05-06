// types
import { ReducerActionPayloadType } from "src/store/reducer-types";
import {
  DeductionByChapter6Type,
  DeductionType80C,
  RentDeductionType,
} from "src/types/deduction-types";
// constants
import {
  UPDATE_80C_DEDUCTION,
  UPDATE_CHAPTER_6_DEDUCTION,
  UPDATE_RENT_DEDUCTION,
  UPDATE_SECTION_24_DEDUCTION,
} from "./deduction-constants";

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
