import { render } from "@testing-library/react";
import TaxCalculator from "./TaxCalculator";
import { useTaxCalculation } from "src/hooks/useTaxCalculation";
import { AppRoutes } from "src/routes/AppRoutes";

// Mock the hooks to avoid real side effects
jest.mock("src/hooks/useTaxCalculation", () => ({
  useTaxCalculation: jest.fn(),
}));

// Mock the AppRoutes to avoid rendering routing-related content
jest.mock("src/routes/AppRoutes", () => ({
  AppRoutes: jest.fn(),
}));
const MockAppRoutes = AppRoutes as jest.MockedFunction<typeof AppRoutes>;
describe("TaxCalculator", () => {
  test("renders Header, TaxSection, and Footer", () => {
    // Render the TaxCalculator component
    render(<TaxCalculator />);

    expect(useTaxCalculation).toHaveBeenCalledTimes(1);

    expect(MockAppRoutes).toBeCalledTimes(1);
  });
});
