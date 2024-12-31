import { screen, render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { selectIsMobile } from "src/store/screen/screen-selectors";
import Navigation from "./Navigation";
import { MemoryRouter } from "react-router";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
jest.mock("src/store/screen/screen-selectors", () => ({
  selectIsMobile: jest.fn(),
}));
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockSelectIsMobile = selectIsMobile as jest.MockedFunction<
  typeof selectIsMobile
>;

describe("test Navigation Component", () => {
  beforeEach(() => {
    mockUseSelector.mockClear();
    mockSelectIsMobile.mockClear();
  });
  const setup = (isMobile: boolean) => {
    mockUseSelector.mockReturnValue(isMobile);
    mockSelectIsMobile.mockReturnValue(isMobile);
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    );
  };
  test("render all options with text in desktop mode", () => {
    setup(false);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByTestId("HomeIcon")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByTestId("SavingsIcon")).toBeInTheDocument();
    expect(screen.getByText("Deduction")).toBeInTheDocument();
    expect(screen.getByTestId("AccountBalanceWalletIcon")).toBeInTheDocument();
    expect(screen.getByText("Tax Breakup")).toBeInTheDocument();
    expect(screen.getByTestId("DashboardIcon")).toBeInTheDocument();
  });
  test("render all options with icon only in non-desktop mode", () => {
    setup(true);
    expect(screen.getByTestId("HomeIcon")).toBeInTheDocument();
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });
});
