import { DeviceType } from "src/types/screen-types";
import { TOGGLE_THEME, UPDATE_MEDIA_TYPE } from "./screen-constants";
import { ReducerActionPayloadType } from "src/types/store-types";

export const setMediaType = (
  payload: DeviceType
): ReducerActionPayloadType => ({
  type: UPDATE_MEDIA_TYPE,
  payload,
});
export const toggleAppTheme = (): ReducerActionPayloadType => ({
  type: TOGGLE_THEME,
});
