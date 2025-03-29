import { AuthReducerType } from "src/types/auth-types";
import { ReducerActionPayloadType } from "src/types/store-types";
import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOGOUT_ACTIVE,
} from "./auth-constants";

const initialState: AuthReducerType = {
  user: undefined,
  isLoggedIn: false,
  isDataLoading: false,
  isLogoutActive: false,
};
const AuthReducer = (
  state = initialState,
  action: ReducerActionPayloadType
) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_USER:
      return {
        ...state,
        user: payload,
        isDataLoading: true,
      };
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        isDataLoading: false,
      };
    case SET_LOGOUT_ACTIVE:
      return {
        ...state,
        isLogoutActive: payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: undefined,
        isLoggedIn: false,
        isLogoutActive: false,
      };
    default:
      return state;
  }
};
export default AuthReducer;
