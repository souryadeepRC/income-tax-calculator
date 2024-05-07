import { UPDATE_MEDIA_TYPE } from "./screen-constants";

export const setMediaType = (payload: string) => {
  return {
    type: UPDATE_MEDIA_TYPE,
    payload,
  };
};
