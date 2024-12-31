import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "src/hooks/useMediaQuery"; // assuming this is where the hook is located
import { setMediaType } from "src/store/screen/screen-actions";
import { renderHook } from "@testing-library/react";

// Mock Redux hooks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>;
describe("useMediaQuery hook", () => {
  const dispatchMock = jest.fn();
  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatchMock);
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return initial media type from useSelector", () => {
    mockUseSelector.mockReturnValue("MOBILE");

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current).toBe("MOBILE");
  });

  test("should dispatch correct action on media query match for TABLET", () => {
    // Mock useSelector to return a media type (e.g., MOBILE)
    mockUseSelector.mockReturnValue("MOBILE");

    // Mock window.matchMedia to simulate a media query match for TABLET
    (window.matchMedia as jest.Mock).mockImplementationOnce(() => ({
      matches: true, // Simulate the tablet media query
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    renderHook(() => useMediaQuery());

    // Ensure that the dispatch function was called with the setMediaType action for TABLET
    expect(dispatchMock).toHaveBeenCalledWith({
      payload: "TABLET",
      type: "UPDATE_MEDIA_TYPE",
    });
  });

  test("should dispatch correct action on media query match for DESKTOP", () => {
    // Mock window.matchMedia to simulate a media query match for DESKTOP
    (window.matchMedia as jest.Mock).mockImplementationOnce(() => ({
      matches: false, // Simulate no match for the initial media query
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    // Mock window.innerWidth to simulate a desktop screen width
    global.innerWidth = 1280;

    renderHook(() => useMediaQuery());

    // Ensure that the dispatch function was called with the setMediaType action for DESKTOP
    expect(dispatchMock).toHaveBeenCalledWith(setMediaType("DESKTOP"));
  });

  test("should dispatch correct action on media query match for MOBILE", () => {
    // Mock window.matchMedia to simulate a media query match for MOBILE
    (window.matchMedia as jest.Mock).mockImplementationOnce(() => ({
      matches: false, // Simulate no match for the initial media query
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    // Mock window.innerWidth to simulate a mobile screen width
    global.innerWidth = 500;

    renderHook(() => useMediaQuery());

    // Ensure that the dispatch function was called with the setMediaType action for MOBILE
    expect(dispatchMock).toHaveBeenCalledWith(setMediaType("MOBILE"));
  });

  /*  it("should clean up the media query listener on unmount", () => {
    // Mock useSelector to return some state
    mockUseSelector.mockReturnValue(MEDIA_TYPES.MOBILE);
    const mockMedia = {
      matches: false, // Simulate no match for the initial media query
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    (window.matchMedia as jest.Mock).mockImplementationOnce(() => mockMedia);
    const { unmount } = renderHook(() => useMediaQuery());

    // Check if removeEventListener was called
    expect(mockMedia.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    // Unmount the hook and ensure cleanup happens
    unmount();

    expect(mockMedia.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  }); */
});
