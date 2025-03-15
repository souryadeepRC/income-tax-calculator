import { IncomeOption } from "src/types/income-types";
import {
  EDIT_INCOME_ENTRY,
  SAVE_INCOME_DETAILS,
  DELETE_INCOME_DETAILS,
  RESET_EDIT_INCOME_ENTRY,
  LOAD_INCOME_DETAILS,
} from "./income-constants";
import { ReducerActionPayloadType } from "src/types/store-types";
export const editIncomeEntry = (
  payload?: string
): ReducerActionPayloadType => ({
  type: EDIT_INCOME_ENTRY,
  payload,
});

export const resetEditIncomeEntry = (): ReducerActionPayloadType => ({
  type: RESET_EDIT_INCOME_ENTRY,
});

export const saveIncomeDetails = (
  payload: IncomeOption
): ReducerActionPayloadType => ({
  type: SAVE_INCOME_DETAILS,
  payload,
});

export const removeIncomeDetails = (
  payload: string
): ReducerActionPayloadType => ({
  type: DELETE_INCOME_DETAILS,
  payload,
});
export const loadIncomeDetails = (
  payload: IncomeOption[]
): ReducerActionPayloadType => {
  return {
    type: LOAD_INCOME_DETAILS,
    payload,
  };
};
