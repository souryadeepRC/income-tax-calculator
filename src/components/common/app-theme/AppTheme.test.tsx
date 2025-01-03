import { screen, render, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import AppTheme from "./AppTheme";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

describe("test AppTheme Component", () => {
  const mockedDispatch = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockedDispatch);
  });
  test("render the theme button with light theme and toggle it", () => {
    mockUseSelector.mockReturnValue("light");
    render(<AppTheme />);

    const themeSwitch = screen.getByRole("checkbox");
    expect(themeSwitch).not.toBeChecked();
    expect(mockedDispatch).toBeCalledTimes(0);

    fireEvent.click(themeSwitch);
    expect(mockedDispatch).toBeCalledWith({ type: "TOGGLE_THEME" });
  });
  test("render the theme button with dark theme", () => {
    mockUseSelector.mockReturnValue("dark");
    render(<AppTheme />);

    const themeSwitch = screen.getByRole("checkbox");
    expect(themeSwitch).toBeChecked();
  });
});
