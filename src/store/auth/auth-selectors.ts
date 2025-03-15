import { AuthUserType } from "src/types/auth-types";
import { AppStoreType } from "src/types/store-types";

export const selectIsLoggedIn = (store: AppStoreType): boolean =>
  store.auth.isLoggedIn;

export const selectIsDataLoading = (store: AppStoreType): boolean =>
  store.auth.isDataLoading;
export const selectIsLogoutActive = (store: AppStoreType): boolean =>
  store.auth.isLogoutActive;
export const selectUser = (store: AppStoreType): AuthUserType | undefined =>
  store.auth.user;
export const selectUserName = (store: AppStoreType): string =>
  store.auth.user?.name || "";
