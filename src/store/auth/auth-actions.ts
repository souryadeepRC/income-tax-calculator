import { AuthUserType } from "src/types/auth-types";
import { LOGIN_USER } from "./auth-constants";
import { ReducerActionPayloadType } from "src/types/store-types";

export const loginUser = (payload: AuthUserType): ReducerActionPayloadType => {
  return {
    type: LOGIN_USER,
    payload,
  };
};
export const logoutUser = (): ReducerActionPayloadType => {
  return {
    type: LOGIN_USER,
  };
};
