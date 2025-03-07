import { AuthReducerType } from "src/types/auth-types";
import { ReducerActionPayloadType } from "src/types/store-types";
import { LOGIN_USER, LOGOUT_USER } from "./auth-constants";

const initialState: AuthReducerType = {
  user: undefined,
  isLoggedIn: false,
};
const AuthReducer = (
  state = initialState,
  action: ReducerActionPayloadType
) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: undefined,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
export default AuthReducer;
