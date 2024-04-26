// store
import { rootStore } from "src/store/root-store";
// types
import { IncomeReducerType } from "src/types/income-types";

export type ReducerActionPayloadType = {
  type: string;
  payload: any;
};

export type AppStoreType = {
  income: IncomeReducerType;
};

export type AppDispatch = typeof rootStore.dispatch;
