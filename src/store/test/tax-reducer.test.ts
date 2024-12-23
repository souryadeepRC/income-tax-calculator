import { TaxReducer } from "src/store/tax/tax-reducer";
import { TaxReducerType } from "src/types/tax-types";
import { updateTaxDetails } from "src/store/tax/tax-actions";
import { UPDATE_TAX_DETAILS } from "src/store/tax/tax-constants";

describe("TaxReducer", () => {
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

  test("should return the initial state when an unknown action type is passed", () => {
    const action = { type: "UNKNOWN_ACTION" };
    expect(TaxReducer(undefined, action)).toEqual(initialState);
  });

  test("should update the state with the payload when the action type is UPDATE_TAX_DETAILS", () => {
    const actionPayload = {
      choice: {
        taxAmount: {
          monthly: 5000,
          yearly: 60000,
        },
        difference: 1000,
        type: "Old",
        percentage: 1.5,
      },
      newScheme: {
        baseTax: 10000,
        cessAmount: 500,
        monthlyTax: 1000,
        taxableAmount: 150000,
        yearlyTax: 12000,
      },
      oldScheme: {
        baseTax: 12000,
        cessAmount: 600,
        monthlyTax: 1200,
        taxableAmount: 160000,
        yearlyTax: 14400,
      },
    };

    const action = updateTaxDetails(actionPayload);

    expect(action).toEqual({
      type: UPDATE_TAX_DETAILS,
      payload: actionPayload,
    });

    /* const action = { type: UPDATE_TAX_DETAILS, payload: actionPayload }; */
    const result = TaxReducer(initialState, action);
    expect(result).toEqual(actionPayload);
  });

  test("should not modify the state when an invalid action type is provided", () => {
    const action = { type: "INVALID_ACTION", payload: {} };
    const result = TaxReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
