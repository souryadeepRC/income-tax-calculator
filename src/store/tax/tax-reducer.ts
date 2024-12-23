// types
import { ReducerActionPayloadType } from "src/store/reducer-types";
import { TaxReducerType } from "src/types/tax-types";
// constants
import { UPDATE_TAX_DETAILS } from "src/store/tax/tax-constants";

const initialState: TaxReducerType = {
  choice: {
    taxAmount: {
      monthly: 0,
      yearly: 0,
    },
    difference: 0,
    type: "New",
    percentage: 0,
  },
  newScheme: {
    baseTax: 0,
    cessAmount: 0,
    monthlyTax: 0,
    taxableAmount: 0,
    yearlyTax: 0,
  },
  oldScheme: {
    baseTax: 0,
    cessAmount: 0,
    monthlyTax: 0,
    taxableAmount: 0,
    yearlyTax: 0,
  },
};
const TaxReducer = (state = initialState, action: ReducerActionPayloadType) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_TAX_DETAILS: {
      return payload;
    }
    default:
      return state;
  }
};
export { TaxReducer };
