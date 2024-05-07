// types
import { ReducerActionPayloadType } from "src/store/reducer-types";
import { ScreenReducerType } from "src/types/screen-types";
// constants
import { UPDATE_MEDIA_TYPE } from "src/store/screen/screen-constants";

const initialState: ScreenReducerType = {
  mediaType: "",
};
const ScreenReducer = (
  state = initialState,
  action: ReducerActionPayloadType
) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_MEDIA_TYPE: {
      return {
        ...state,
        mediaType: payload,
      };
    }

    default:
      return state;
  }
};
export { ScreenReducer };

