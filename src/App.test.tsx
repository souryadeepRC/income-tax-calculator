import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import App from "./App"; // Adjust import based on file structure
import { TaxCalculator } from "src/pages/income-tax-calculator/TaxCalculator";

jest.mock("src/pages/income-tax-calculator/TaxCalculator", () => ({
  TaxCalculator: jest.fn(() => <div>Tax Calculator</div>),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
jest.mock("src/store/screen/screen-selectors", () => ({
  selectAppTheme: jest.fn(),
}));
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockedTaxCalculator = TaxCalculator as jest.MockedFunction<
  typeof TaxCalculator
>;

describe("App component", () => {
  it("should render the TaxCalculator and apply the correct theme", () => {
    mockUseSelector.mockReturnValue("dark");
    mockedTaxCalculator.mockReturnValue(<div>Tax Calculator</div>);

    render(<App />);

    // Adjust this based on the actual text rendered by TaxCalculator
    expect(screen.getByText(/Tax Calculator/i)).toBeInTheDocument();

    // Check if the theme is applied
    expect(screen.getByTestId("app-container")).toHaveAttribute(
      "data-theme",
      "dark"
    );
  });
});
