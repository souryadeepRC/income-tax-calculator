import { render, screen } from "@testing-library/react";
import { TaxCalculator } from "./TaxCalculator"; // Adjust the path based on your file structure
import { Header, Footer } from "src/components/common/CommonComponents";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { useTaxCalculation } from "src/hooks/useTaxCalculation";
import { AppRoutes } from "src/routes/AppRoutes";

// Mock the hooks to avoid real side effects
jest.mock("src/hooks/useMediaQuery", () => ({ useMediaQuery: jest.fn() }));
jest.mock("src/hooks/useTaxCalculation", () => ({
  useTaxCalculation: jest.fn(),
}));

// Mock the components that are imported and rendered within TaxCalculator
jest.mock("src/components/common/CommonComponents", () => ({
  Header: jest.fn(),
  Footer: jest.fn(),
}));

// Mock the AppRoutes to avoid rendering routing-related content
jest.mock("src/routes/AppRoutes", () => ({
  AppRoutes: jest.fn(),
}));
const MockHeader = Header as jest.MockedFunction<typeof Header>;
const MockFooter = Footer as jest.MockedFunction<typeof Footer>;
const MockAppRoutes = AppRoutes as jest.MockedFunction<typeof AppRoutes>;
describe("TaxCalculator", () => {
  test("renders Header, TaxSection, and Footer", () => {
    // Render the TaxCalculator component
    render(<TaxCalculator />);

    expect(useMediaQuery).toHaveBeenCalledTimes(1);
    expect(useTaxCalculation).toHaveBeenCalledTimes(1);

    expect(MockHeader).toBeCalledTimes(1);
    expect(MockFooter).toBeCalledTimes(1);
    expect(MockAppRoutes).toBeCalledTimes(1);
  });
});
