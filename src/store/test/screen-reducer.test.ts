import { ScreenReducer } from "src/store/screen/screen-reducer";
import { setMediaType, toggleAppTheme } from "src/store/screen/screen-actions";
import { ScreenReducerType } from "src/types/screen-types"; // Import your types

describe("ScreenReducer", () => {
  // Test case for the initial state
  test("should return the initial state by default", () => {
    const initialState: ScreenReducerType = {
      mediaType: "DESKTOP",
      theme: "light",
    };
    const result = ScreenReducer(undefined, { type: "@@INIT" });
    expect(result).toEqual(initialState);
  });

  // Test case for UPDATE_MEDIA_TYPE action
  test("should handle UPDATE_MEDIA_TYPE action", () => {
    const initialState: ScreenReducerType = {
      mediaType: "DESKTOP",
      theme: "light",
    };
    const payload = "DESKTOP";
    const action = setMediaType(payload);

    const expectedState: ScreenReducerType = {
      mediaType: "DESKTOP",
      theme: "light",
    };

    const result = ScreenReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  // Test case for TOGGLE_THEME action
  test("should handle TOGGLE_THEME action when theme is light", () => {
    const initialState: ScreenReducerType = {
      mediaType: "DESKTOP",
      theme: "light",
    };
    const action = toggleAppTheme();

    const expectedState: ScreenReducerType = {
      mediaType: "DESKTOP",
      theme: "dark",
    };

    const result = ScreenReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  test("should handle TOGGLE_THEME action when theme is dark", () => {
    const initialState: ScreenReducerType = {
      mediaType: "DESKTOP",
      theme: "dark",
    };
    const action = toggleAppTheme();

    const expectedState: ScreenReducerType = {
      mediaType: "DESKTOP",
      theme: "light",
    };

    const result = ScreenReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});
