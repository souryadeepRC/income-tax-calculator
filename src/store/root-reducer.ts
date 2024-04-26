import { combineReducers } from "@reduxjs/toolkit";

// reducer
import { IncomeReducer } from "./income/income-reducer";

// Define your reducers
const combinedReducers = combineReducers({
  income: IncomeReducer,
});
const rootReducer = (state: any, action: any) => {
  return combinedReducers(state, action);
};
export { rootReducer };

