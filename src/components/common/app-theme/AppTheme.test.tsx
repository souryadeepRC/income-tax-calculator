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
  test("render the theme button with default text and click", () => {
    mockUseSelector.mockReturnValue("light");
    const mockedDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockedDispatch);
    render(<AppTheme />);

    const themeSwitch = screen.getByTestId("app-theme");
    expect(themeSwitch).toBeChecked();

    fireEvent.click(themeSwitch);

    expect(mockedDispatch).toBeCalledTimes(1);
    expect(mockedDispatch).toBeCalledWith({ type: "TOGGLE_THEME" });
  });
  test("render the theme button with dark theme", () => {
    mockUseSelector.mockReturnValue("dark");
    render(<AppTheme />);

    const themeSwitch = screen.getByTestId("app-theme");
    expect(themeSwitch).not.toBeChecked();
  });
});
