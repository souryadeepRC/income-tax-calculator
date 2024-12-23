import { UPDATE_TAX_DETAILS } from "./tax-constants";

export const updateTaxDetails = (payload: any) => {
  return {
    type: UPDATE_TAX_DETAILS,
    payload,
  };
};
