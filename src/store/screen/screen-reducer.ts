import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import { DeviceType, ScreenReducerType } from "src/types/screen-types";

const initialState: ScreenReducerType = {
  mediaType: "DESKTOP",
};
const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setMediaType: (state, action: PayloadAction<DeviceType>) => {
      return {
        ...state,
        mediaType: action.payload,
      };
    },
  },
});
export const { setMediaType } = screenSlice.actions;
export default screenSlice.reducer;
