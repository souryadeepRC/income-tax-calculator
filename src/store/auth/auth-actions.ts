import { AuthUserType } from "src/types/auth-types";
import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOGOUT_ACTIVE,
} from "./auth-constants";
import { ReducerActionPayloadType } from "src/types/store-types";

export const createUser = (payload: AuthUserType): ReducerActionPayloadType => {
  return {
    type: CREATE_USER,
    payload,
  };
};
export const loginUser = (): ReducerActionPayloadType => {
  return {
    type: LOGIN_USER,
  };
};
export const logoutUser = (): ReducerActionPayloadType => {
  return {
    type: LOGOUT_USER,
  };
};
export const setLogoutActive = (payload: boolean): ReducerActionPayloadType => {
  return {
    type: SET_LOGOUT_ACTIVE,
    payload,
  };
};
