// store
import { rootStore } from "src/store/root-store";
import { DeductionReducerType } from "src/types/deduction-types";
// types
import { IncomeReducerType } from "src/types/income-types";
import { ScreenReducerType } from "src/types/screen-types";
import { TaxReducerType } from "src/types/tax-types";
import { AuthReducerType } from "./auth-types";

export type ReducerActionPayloadType = {
  type: string;
  /* eslint-disable */
  payload?: any;
};

export type AppStoreType = {
  auth: AuthReducerType;
  income: IncomeReducerType;
  deduction: DeductionReducerType;
  screen: ScreenReducerType;
  tax: TaxReducerType;
};

export type AppDispatch = typeof rootStore.dispatch;
