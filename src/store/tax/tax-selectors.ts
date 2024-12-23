// types
import { AppStoreType } from "src/store/reducer-types";

export const selectTaxDetails = (store: AppStoreType): any => store.tax;
export const selectTaxChoice = (store: AppStoreType): any => store.tax.choice;
