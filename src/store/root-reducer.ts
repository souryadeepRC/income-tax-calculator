import { combineReducers } from "@reduxjs/toolkit";

// reducer
import { DeductionReducer } from "./deduction/deduction-reducer";
import { IncomeReducer } from "./income/income-reducer";
import { ScreenReducer } from "./screen/screen-reducer";
import { TaxReducer } from "./tax/tax-reducer";

// Define your reducers
const combinedReducers = combineReducers({
  income: IncomeReducer,
  deduction: DeductionReducer,
  tax: TaxReducer,
  screen: ScreenReducer,
});
const rootReducer = (state: any, action: any) => {
  return combinedReducers(state, action);
};
export { rootReducer };
