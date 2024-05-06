import { combineReducers } from "@reduxjs/toolkit";

// reducer
import { DeductionReducer } from "./deduction/deduction-reducer";
import { IncomeReducer } from "./income/income-reducer";

// Define your reducers
const combinedReducers = combineReducers({
  income: IncomeReducer,
  deduction: DeductionReducer,
});
const rootReducer = (state: any, action: any) => {
  return combinedReducers(state, action);
};
export { rootReducer };

