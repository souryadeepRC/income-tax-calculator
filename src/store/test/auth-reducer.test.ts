import { AuthReducerType } from "src/types/auth-types";
import AuthReducer from "../auth/auth-reducer";

const mockState: AuthReducerType = {
  user: undefined,
  isLoggedIn: false,
};
describe("Auth Reducer", () => {
  test("should return the initial state when an unknown action type is passed", () => {
    const action = { type: "UNKNOWN_ACTION" };
    expect(AuthReducer(undefined, action)).toEqual(mockState);
  });
  test("after login store user details and alter logged in status", () => {
    const action = {
      type: "LOGIN_USER",
      payload: { name: "Test", email: "test@mail.com" },
    };
    expect(AuthReducer(mockState, action)).toEqual({
      user: { name: "Test", email: "test@mail.com" },
      isLoggedIn: true,
    });
  });
  test("after logout remove user details and alter logged in status", () => {
    const action = {
      type: "LOGOUT_USER",
    };
    expect(AuthReducer(mockState, action)).toEqual({
      user: undefined,
      isLoggedIn: false,
    });
  });
});
