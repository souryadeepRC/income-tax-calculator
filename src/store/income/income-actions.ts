import { incomeDetailsUpdateType } from "src/types/income-types";
import { UPDATE_INCOME_DETAILS } from "./income-constants";

export const updateIncomeDetails = (payload: incomeDetailsUpdateType) => {
  return {
    type: UPDATE_INCOME_DETAILS,
    payload,
  };
};
