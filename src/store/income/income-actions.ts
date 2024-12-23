import { IncomeOption } from "src/types/income-types";
import {
  EDIT_INCOME_ENTRY,
  SAVE_INCOME_DETAILS,
  DELETE_INCOME_DETAILS,
  RESET_EDIT_INCOME_ENTRY,
} from "./income-constants";
export const editIncomeEntry = (payload?: string) => {
  return { type: EDIT_INCOME_ENTRY, payload };
};
export const resetEditIncomeEntry = () => {
  return { type: RESET_EDIT_INCOME_ENTRY };
};

export const saveIncomeDetails = (payload: IncomeOption) => {
  return {
    type: SAVE_INCOME_DETAILS,
    payload,
  };
};

export const removeIncomeDetails = (payload: string) => {
  return {
    type: DELETE_INCOME_DETAILS,
    payload,
  };
};
