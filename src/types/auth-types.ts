export interface AuthReducerType {
  user: AuthUserType | undefined;
  isLoggedIn: boolean;
  isDataLoading: boolean;
  isLogoutActive: boolean;
}
export interface AuthUserType {
  email: string;
  name: string;
}
