// store
import { rootStore } from "src/store/root-store";
import { DeductionReducerType } from "src/types/deduction-types";
// types
import { IncomeReducerType } from "src/types/income-types";

export type ReducerActionPayloadType = {
  type: string;
  payload: any;
};

export type AppStoreType = {
  income: IncomeReducerType;
  deduction: DeductionReducerType;
};

export type AppDispatch = typeof rootStore.dispatch;
