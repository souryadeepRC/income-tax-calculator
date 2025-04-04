import { useCallback, useEffect, useRef } from "react";
// library
import { useDispatch } from "react-redux";
// actions
import { setMediaType } from "src/store/screen/screen-reducer";
// types
import { AppDispatch } from "src/types/store-types";
// constants
import {
  MEDIA_TYPES,
  RESPONSIVE_MEDIA_QUERY,
} from "src/constants/screen-constants";

const useMediaQuery: () => void = () => {
  // store
  const dispatch: AppDispatch = useDispatch();
  // refs
  const initialRenderRef = useRef<boolean>(false);
  // fns
  const updateMediaType = useCallback(
    (event: MediaQueryListEvent | MediaQueryList): void => {
      if (event.matches) {
        dispatch(setMediaType(MEDIA_TYPES.TABLET));
      } else {
        if (window?.innerWidth > RESPONSIVE_MEDIA_QUERY.MOBILE.maxWidth) {
          dispatch(setMediaType(MEDIA_TYPES.DESKTOP));
        } else {
          dispatch(setMediaType(MEDIA_TYPES.MOBILE));
        }
      }
    },
    [dispatch]
  );
  useEffect(() => {
    const media: MediaQueryList = window.matchMedia(
      `(min-width:${RESPONSIVE_MEDIA_QUERY.TABLET.minWidth}px) and (max-width:${RESPONSIVE_MEDIA_QUERY.TABLET.maxWidth}px)`
    );

    media.addEventListener("change", updateMediaType);

    // update media type at initial app load
    if (!initialRenderRef.current) {
      updateMediaType(media);
      initialRenderRef.current = true;
    }

    return () => {
      media.removeEventListener("change", updateMediaType);
    };
  }, [updateMediaType]);
};
export { useMediaQuery };
