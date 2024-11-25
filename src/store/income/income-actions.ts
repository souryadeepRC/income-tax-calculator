import {
  IncomeComponent,
  incomeDetailsUpdateType,
} from "src/types/income-types";
import {
  MODIFY_INCOME_DETAILS,
  SET_EDITABLE_INCOME_DETAILS,
  UPDATE_INCOME_DETAILS,
  UPDATE_TAX_DETAILS,
} from "./income-constants";

export const updateIncomeDetails = (payload: incomeDetailsUpdateType) => {
  return {
    type: UPDATE_INCOME_DETAILS,
    payload,
  };
};
export const modifyIncomeDetails = (payload: IncomeComponent) => {
  return {
    type: MODIFY_INCOME_DETAILS,
    payload,
  };
};
export const updateTaxDetails = (payload: any) => {
  return {
    type: UPDATE_TAX_DETAILS,
    payload,
  };
};
export const setEditableIncomeDetails = (payload: any) => {
  return {
    type: SET_EDITABLE_INCOME_DETAILS,
    payload,
  };
};
