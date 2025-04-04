import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import { AuthReducerType, AuthUserType } from "src/types/auth-types";

const initialState: AuthReducerType = {
  user: undefined,
  isLoggedIn: false,
  isDataLoading: false,
  isLogoutActive: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<AuthUserType>) => {
      return {
        ...state,
        user: action.payload,
        isDataLoading: true,
      };
    },
    loginUser: (state) => {
      return {
        ...state,
        isLoggedIn: true,
        isDataLoading: false,
      };
    },
    setLogoutActive: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLogoutActive: action.payload,
      };
    },

    logoutUser: (state) => {
      return {
        ...state,
        user: undefined,
        isLoggedIn: false,
        isLogoutActive: false,
      };
    },
  },
});

export const { createUser, loginUser, setLogoutActive, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
