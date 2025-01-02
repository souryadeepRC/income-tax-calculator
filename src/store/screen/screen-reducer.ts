// types
import { ReducerActionPayloadType } from "src/types/store-types";
import { ScreenReducerType } from "src/types/screen-types";
// constants
import {
  TOGGLE_THEME,
  UPDATE_MEDIA_TYPE,
} from "src/store/screen/screen-constants";

const initialState: ScreenReducerType = {
  mediaType: "DESKTOP",
  theme: "light",
};
const ScreenReducer = (
  state = initialState,
  action: ReducerActionPayloadType
): ScreenReducerType => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_MEDIA_TYPE: {
      return {
        ...state,
        mediaType: payload,
      };
    }
    case TOGGLE_THEME: {
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    }
    default:
      return state;
  }
};
export { ScreenReducer };
