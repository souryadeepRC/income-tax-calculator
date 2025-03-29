import { combineReducers } from "@reduxjs/toolkit";

// reducer
import AuthReducer from "./auth/auth-reducer";
import { DeductionReducer } from "./deduction/deduction-reducer";
import { IncomeReducer } from "./income/income-reducer";
import { ScreenReducer } from "./screen/screen-reducer";
import { ReducerActionPayloadType } from "src/types/store-types";

// Define your reducers
const combinedReducers = combineReducers({
  auth: AuthReducer,
  income: IncomeReducer,
  deduction: DeductionReducer,
  screen: ScreenReducer,
});
/* eslint-disable */
const rootReducer = (state: any, action: ReducerActionPayloadType) => {
  return combinedReducers(state, action);
};
export { rootReducer };
