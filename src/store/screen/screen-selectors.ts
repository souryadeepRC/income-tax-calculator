// types
import { AppStoreType } from "src/types/store-types";
import { AppTheme } from "src/types/screen-types";
// constants
import { MEDIA_TYPES } from "src/constants/screen-constants";

export const selectMediaType = (store: AppStoreType): string =>
  store.screen.mediaType;
export const selectIsMobile = (store: AppStoreType): boolean =>
  store.screen.mediaType === MEDIA_TYPES.MOBILE;
export const selectAppTheme = (store: AppStoreType): AppTheme => store.screen.theme;
