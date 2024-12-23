// store
import { rootStore } from "src/store/root-store";
import { DeductionReducerType } from "src/types/deduction-types";
// types
import { IncomeReducerType } from "src/types/income-types";
import { ScreenReducerType } from "src/types/screen-types";
import { TaxReducerType } from "src/types/tax-types";

export type ReducerActionPayloadType = {
  type: string;
  payload: any;
};

export type AppStoreType = {
  income: IncomeReducerType;
  deduction: DeductionReducerType;
  screen: ScreenReducerType;
  tax: TaxReducerType;
};

export type AppDispatch = typeof rootStore.dispatch;
