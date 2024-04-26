
import { configureStore } from "@reduxjs/toolkit";
// reducers
import { rootReducer } from "./root-reducer";
 

const rootStore = configureStore({
  reducer: rootReducer,
  devTools: process.env.ENVIRONMENT !== "production",
});
 

export { rootStore };
