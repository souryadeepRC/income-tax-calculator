import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import App from "./App";
import { useMediaQuery } from "src/hooks";
import { selectAppTheme } from "src/store/screen/screen-selectors";

jest.mock("src/components/common", () => ({
  Header: jest.fn(() => <div>Header</div>),
  Footer: jest.fn(() => <div>Footer</div>),
}));
jest.mock("src/pages/income-tax-calculator/TaxCalculator", () => jest.fn());

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

jest.mock("src/hooks/useMediaQuery", () => ({ useMediaQuery: jest.fn() }));
describe("App component", () => {
  test("should render the TaxCalculator and apply the correct theme", () => {
    mockUseSelector.mockReturnValue("dark");

    render(<App />);

    expect(mockUseSelector).toHaveBeenCalledWith(selectAppTheme);
    expect(useMediaQuery).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Tax Calculator/i)).toBeInTheDocument();

    // Check if the theme is applied
    expect(screen.getByTestId("app-container")).toHaveAttribute(
      "data-theme",
      "dark"
    );
  });
});
