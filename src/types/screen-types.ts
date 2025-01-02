export type AppTheme = "light" | "dark";

export type DeviceType = "MOBILE" | "TABLET" | "DESKTOP";
export type DeviceMedia = {
  /* eslint-disable */
  [key in DeviceType]: DeviceType;
};

export interface ScreenReducerType {
  mediaType: DeviceType;
  theme: AppTheme;
}
