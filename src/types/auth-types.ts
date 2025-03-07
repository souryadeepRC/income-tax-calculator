export interface AuthReducerType {
  user: AuthUserType | undefined;
  isLoggedIn: boolean;
}
export interface AuthUserType {
  email: string;
  name: string;
}
