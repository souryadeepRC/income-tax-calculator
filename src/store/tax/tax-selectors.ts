// types
import { AppStoreType } from "src/types/store-types";
import { TaxChoice, TaxReducerType } from "src/types/tax-types";

export const selectTaxDetails = (store: AppStoreType): TaxReducerType =>
  store.tax;
export const selectTaxChoice = (store: AppStoreType): TaxChoice =>
  store.tax.choice;
