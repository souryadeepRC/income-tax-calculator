export const MEDIA_TYPES: {
  MOBILE: string;
  TABLET: string;
  DESKTOP: string;
} = {
  MOBILE: "MOBILE",
  DESKTOP: "DESKTOP",
  TABLET: "TABLET",
};
export const RESPONSIVE_MEDIA_QUERY: {
  MOBILE: { maxWidth: number };
  TABLET: { minWidth: number; maxWidth: number };
  DESKTOP: { minWidth: number };
} = {
  MOBILE: { maxWidth: 767 },
  TABLET: { minWidth: 768, maxWidth: 1023 },
  DESKTOP: { minWidth: 1024 },
};
export const THEME_TYPES: {
  LIGHT: string;
  DARK: string;
} = {
  LIGHT: "light",
  DARK: "dark",
};
