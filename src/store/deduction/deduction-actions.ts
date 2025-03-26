// types
import { ReducerActionPayloadType } from "src/types/store-types";
import {
  ActionEditEntryPayload,
  ActionDeleteEntryPayload,
  DeductionEntry,
  RentEntry,
} from "src/types/deduction-types";
// constants
import {
  DELETE_DEDUCTION,
  SET_RENT_DEDUCTED_AMOUNT,
  RESET_DEDUCTION_ACTION,
  EDIT_DEDUCTION,
  SAVE_RENT_ENTRY,
  DELETE_RENT_ENTRY,
  SAVE_SECTION_24_ENTRY,
  DELETE_SECTION_24_ENTRY,
  SAVE_SECTION_80C_ENTRY,
  DELETE_SECTION_80C_ENTRY,
  DELETE_80C_ENTRY,
  SAVE_80C_ENTRY,
  RESET_EDIT_80C_ENTRY,
  EDIT_80C_ENTRY,
  EDIT_CHAPTER_VI_ENTRY,
  SAVE_CHAPTER_VI_ENTRY,
  DELETE_CHAPTER_VI_ENTRY,
  RESET_EDIT_CHAPTER_VI_ENTRY,
  LOAD_DEDUCTION,
  SAVE_DEDUCTION_ENTRY,
  DELETE_DEDUCTION_ENTRY,
} from "./deduction-constants";
import { DeductionResponse } from "./mapper/deduction-mapper";

export const editDeduction = (
  payload: ActionEditEntryPayload
): ReducerActionPayloadType => ({
  type: EDIT_DEDUCTION,
  payload,
});

export const deleteDeduction = (
  payload: ActionDeleteEntryPayload
): ReducerActionPayloadType => ({
  type: DELETE_DEDUCTION,
  payload,
});

export const resetDeductionAction = (): ReducerActionPayloadType => ({
  type: RESET_DEDUCTION_ACTION,
});

export const saveDeductionEntry = (
  payload: DeductionResponse
): ReducerActionPayloadType => ({
  type: SAVE_DEDUCTION_ENTRY,
  payload,
});

export const removeDeductionEntry = (
  payload: string
): ReducerActionPayloadType => ({
  type: DELETE_DEDUCTION_ENTRY,
  payload,
});

export const saveRentEntry = (payload: any): ReducerActionPayloadType => ({
  type: SAVE_RENT_ENTRY,
  payload,
});

export const deleteRentEntry = (payload: string): ReducerActionPayloadType => ({
  type: DELETE_RENT_ENTRY,
  payload,
});

export const setRentDeductedAmount = (
  payload: number
): ReducerActionPayloadType => ({
  type: SET_RENT_DEDUCTED_AMOUNT,
  payload,
});

export const saveSection80CEntry = (payload: {
  id: string;
  category: string;
  amount: number;
}): ReducerActionPayloadType => ({
  type: SAVE_SECTION_80C_ENTRY,
  payload,
});
export const deleteSection80CEntry = (
  payload: string
): ReducerActionPayloadType => {
  return {
    type: DELETE_SECTION_80C_ENTRY,
    payload,
  };
};

export const saveSection24Entry = (payload: {
  id: string;
  amount: number;
}): ReducerActionPayloadType => ({
  type: SAVE_SECTION_24_ENTRY,
  payload,
});
export const deleteSection24Entry = (
  payload: string
): ReducerActionPayloadType => {
  return {
    type: DELETE_SECTION_24_ENTRY,
    payload,
  };
};

export const edit80CEntry = (payload?: string): ReducerActionPayloadType => ({
  type: EDIT_80C_ENTRY,
  payload,
});

export const resetEdit80CEntry = (): ReducerActionPayloadType => ({
  type: RESET_EDIT_80C_ENTRY,
});

export const save80CEntry = (
  payload: DeductionEntry
): ReducerActionPayloadType => ({
  type: SAVE_80C_ENTRY,
  payload,
});

export const delete80CEntry = (payload: string): ReducerActionPayloadType => ({
  type: DELETE_80C_ENTRY,
  payload,
});

export const editChapterVIEntry = (
  payload?: string
): ReducerActionPayloadType => ({
  type: EDIT_CHAPTER_VI_ENTRY,
  payload,
});

export const resetEditChapterVIEntry = (): ReducerActionPayloadType => ({
  type: RESET_EDIT_CHAPTER_VI_ENTRY,
});

export const saveChapterVIEntry = (
  payload: DeductionEntry
): ReducerActionPayloadType => ({
  type: SAVE_CHAPTER_VI_ENTRY,
  payload,
});

export const deleteChapterVIEntry = (
  payload: string
): ReducerActionPayloadType => ({
  type: DELETE_CHAPTER_VI_ENTRY,
  payload,
});

export const loadDeduction = (
  payload: DeductionResponse[]
): ReducerActionPayloadType => {
  return {
    type: LOAD_DEDUCTION,
    payload,
  };
};
