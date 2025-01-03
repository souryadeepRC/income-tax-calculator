import { render, screen } from "@testing-library/react";
import { AppTheme } from "src/components/common/CommonComponents";
import {
  NavigationDesktop,
  NavigationMobile,
} from "src/components/navigation/Navigation";
import Header from "./Header";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
jest.mock("src/components/navigation/Navigation", () => ({
  NavigationDesktop: jest.fn(),
  NavigationMobile: jest.fn(),
}));
jest.mock("src/components/common/CommonComponents", () => ({
  AppTheme: jest.fn(),
}));
const MockNavigationDesktop = NavigationDesktop as jest.MockedFunction<
  typeof NavigationDesktop
>;
const MockNavigationMobile = NavigationMobile as jest.MockedFunction<
  typeof NavigationMobile
>;
const MockAppTheme = AppTheme as jest.MockedFunction<typeof AppTheme>;
const mockUSeSelector = useSelector as jest.MockedFunction<typeof useSelector>;
describe("test Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    MockNavigationDesktop.mockReturnValue(<div>Navigation Desktop</div>);
    MockNavigationMobile.mockReturnValue(<div>Navigation Mobile</div>);
    MockAppTheme.mockReturnValue(<div>Mocked AppTheme</div>);
  });
  const renderHeader = (isMobile: boolean) => {
    mockUSeSelector.mockReturnValue(isMobile);
    render(<Header />);
  };
  test("render header UI for desktop", () => {
    renderHeader(false);

    expect(screen.getByText("Tax Calculator")).toBeInTheDocument();
    expect(screen.getByText("Navigation Desktop")).toBeInTheDocument();
    expect(screen.queryByText("Navigation Mobile")).not.toBeInTheDocument();
    expect(screen.getByText("Mocked AppTheme")).toBeInTheDocument();
  });
  test("render header UI for mobile", () => {
    renderHeader(true);

    expect(screen.getByText("Tax Calculator")).toBeInTheDocument();
    expect(screen.queryByText("Navigation Desktop")).not.toBeInTheDocument();
    expect(screen.getByText("Navigation Mobile")).toBeInTheDocument();
    expect(screen.getByText("Mocked AppTheme")).toBeInTheDocument();
  });
});
