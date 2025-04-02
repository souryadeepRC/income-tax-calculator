import { configureStore } from "@reduxjs/toolkit";
// reducers
import { rootReducer } from "./root-reducer";

const rootStore = configureStore({
  reducer: rootReducer,
  devTools:  import.meta.env.ENVIRONMENT !== "production",
});

export { rootStore };
