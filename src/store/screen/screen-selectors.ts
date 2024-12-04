// types
import { AppStoreType } from "src/store/reducer-types";
// constants
import { MEDIA_TYPES } from "src/constants/screen-constants";

export const selectMediaType = (store: AppStoreType): string =>
  store.screen.mediaType;
export const selectIsMobile = (store: AppStoreType): boolean =>
  store.screen.mediaType === MEDIA_TYPES.MOBILE;
export const selectAppTheme = (store: AppStoreType): "light" | "dark" =>
  store.screen.theme;
