// types
import { ReducerActionPayloadType } from "src/store/reducer-types";
import { DeductionEntry, RentEntry } from "src/types/deduction-types";
// constants
import {
  SET_RENT_DEDUCTED_AMOUNT,
  RESET_EDIT_RENT_ENTRY,
  EDIT_RENT_ENTRY,
  SAVE_RENT_ENTRY,
  DELETE_RENT_ENTRY,
  UPDATE_SECTION_24_DEDUCTION,
  DELETE_80C_ENTRY,
  SAVE_80C_ENTRY,
  RESET_EDIT_80C_ENTRY,
  EDIT_80C_ENTRY,
  EDIT_CHAPTER_VI_ENTRY,
  SAVE_CHAPTER_VI_ENTRY,
  DELETE_CHAPTER_VI_ENTRY,
  RESET_EDIT_CHAPTER_VI_ENTRY,
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
export const updateSection24Deduction = (
  payload: number,
): ReducerActionPayloadType => {
  return {
    type: UPDATE_SECTION_24_DEDUCTION,
    payload,
  };
};
export const edit80CEntry = (payload?: string) => {
  return { type: EDIT_80C_ENTRY, payload };
};
export const resetEdit80CEntry = () => {
  return { type: RESET_EDIT_80C_ENTRY };
};
export const save80CEntry = (payload: DeductionEntry) => {
  return { type: SAVE_80C_ENTRY, payload };
};
export const delete80CEntry = (payload: string) => {
  return { type: DELETE_80C_ENTRY, payload };
};

export const editChapterVIEntry = (payload?: string) => {
  return { type: EDIT_CHAPTER_VI_ENTRY, payload };
};
export const resetEditChapterVIEntry = () => {
  return { type: RESET_EDIT_CHAPTER_VI_ENTRY };
};
export const saveChapterVIEntry = (payload: DeductionEntry) => {
  return { type: SAVE_CHAPTER_VI_ENTRY, payload };
};
export const deleteChapterVIEntry = (payload: string) => {
  return { type: DELETE_CHAPTER_VI_ENTRY, payload };
};
