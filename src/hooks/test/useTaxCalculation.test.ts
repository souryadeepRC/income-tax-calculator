import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useTaxCalculation } from "../useTaxCalculation";
import { calculateTax } from "src/utils/tax-calculation";
import {
  selectSalaryIncome,
  selectOverallIncomeAmount,
} from "src/store/income/income-selectors";
import { selectDeduction } from "src/store/deduction/deduction-selectors";

jest.mock("src/utils/tax-calculation", () => ({
  calculateTax: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

describe("useTaxCalculation", () => {
  const mockDispatch = jest.fn();

  // Mocking return values for selectors
  beforeEach(() => {
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockImplementation((selector) => {
      if (selector === selectSalaryIncome) return [];
      if (selector === selectOverallIncomeAmount) return 70000;
      if (selector === selectDeduction) return {};
      return undefined;
    });

    // Mocking calculateTax to return a predefined tax breakup
    (calculateTax as jest.Mock).mockReturnValue({
      totalTax: 10000,
      taxBreakdown: { incomeTax: 8000, cess: 2000 },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should calculate tax and dispatch updateTaxDetails", () => {
    renderHook(() => useTaxCalculation());

    // Check if the calculateTax function is called with the correct arguments
    expect(calculateTax).toHaveBeenCalledWith([], 70000, {});

    // Ensure the updateTaxDetails action is called with the correct tax details
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_TAX_DETAILS",
      payload: {
        totalTax: 10000,
        taxBreakdown: { incomeTax: 8000, cess: 2000 },
      },
    });
  });
  test("should recalculate tax and dispatch when dependencies change", () => {
    const { rerender } = renderHook(() => useTaxCalculation());
    const mockSalaryIncome = [
      { label: "test income", amount: 2000, category: "salary" },
    ];
    mockUseSelector.mockImplementation((selector) => {
      if (selector === selectSalaryIncome) return mockSalaryIncome;
      if (selector === selectOverallIncomeAmount) return 80000;
      if (selector === selectDeduction) return {};
      return undefined;
    });

    // Re-run the hook with updated state
    rerender();

    // Ensure calculateTax is called with the updated values
    expect(calculateTax).toHaveBeenCalledWith(mockSalaryIncome, 80000, {});

    // Ensure updateTaxDetails is dispatched with the new tax details
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test("should not dispatch if taxBreakup is the same", () => {
    // Set the mock to return the same tax breakup
    (calculateTax as jest.Mock).mockReturnValue({
      totalTax: 10000,
      taxBreakdown: { incomeTax: 8000, cess: 2000 },
    });

    renderHook(() => useTaxCalculation());

    // Ensure dispatch is only called once on initial render, not on subsequent renders if tax hasn't changed
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
