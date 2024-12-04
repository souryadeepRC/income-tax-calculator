import { TOGGLE_THEME, UPDATE_MEDIA_TYPE } from "./screen-constants";

export const setMediaType = (payload: string) => {
  return {
    type: UPDATE_MEDIA_TYPE,
    payload,
  };
};

export const toggleAppTheme = () => {
  return { type: TOGGLE_THEME };
};
