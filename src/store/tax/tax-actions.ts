import { TaxReducerType } from "src/types/tax-types";
import { UPDATE_TAX_DETAILS } from "./tax-constants";
import { ReducerActionPayloadType } from "src/types/store-types";

export const updateTaxDetails = (
  payload: TaxReducerType
): ReducerActionPayloadType => ({
  type: UPDATE_TAX_DETAILS,
  payload,
});
