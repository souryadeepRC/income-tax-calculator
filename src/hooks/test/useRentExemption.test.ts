import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { calculateRentDeduction } from "src/utils/tax-calculation";
import { selectRentCollections } from "src/store/deduction/deduction-selectors";
import { selectRentEligibleDetails } from "src/store/income/income-selectors";
import useRentExemption from "../useRentExemption";
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("src/utils/tax-calculation", () => ({
  calculateRentDeduction: jest.fn(() => 2000),
}));

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
describe("useRentExemption", () => {
  const mockDispatch = jest.fn();

  // Mock the return values for the selectors
  beforeEach(() => {
    mockUseDispatch.mockReturnValue(mockDispatch);
    const mockData1 = [
      { amount: 5000, duration: 12, isMetroCity: true },
      { amount: 3000, duration: 6, isMetroCity: false },
    ];
    const mockData2 = { basic: 20000, hra: 8000 };
    mockUseSelector.mockImplementation((selector) => {
      if (selector === selectRentCollections) return mockData1;
      if (selector === selectRentEligibleDetails) return mockData2;
      return undefined;
    });

    // Mock the utility function to return some predefined values
    (calculateRentDeduction as jest.Mock).mockImplementation(() => 2000);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should calculate and dispatch the rent exemption correctly", () => {
    renderHook(() => useRentExemption());

    // Check if the calculateRentDeduction function is called with the correct arguments
    expect(calculateRentDeduction).toHaveBeenCalledWith(
      5000, // Metro amount
      12, // Metro duration
      true, // isMetroCity
      20000, // basic salary
      8000, // HRA
    );
    expect(calculateRentDeduction).toHaveBeenCalledWith(
      3000, // Non-metro amount
      6, // Non-metro duration
      false, // not a metro city
      20000, // basic salary
      8000, // HRA
    );

    // The final rent exemption (metro + non-metro) should be dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 4000,
      type: "SET_RENT_DEDUCTED_AMOUNT",
    }); // Assuming each rent deduction is 2000 and the total deduction is 4000
  });

  test("should handle case when rent exemption is greater than HRA", () => {
    // Mocking calculateRentDeduction to return a larger exemption
    (calculateRentDeduction as jest.Mock)
      .mockImplementationOnce(() => 12000)
      .mockImplementationOnce(() => 10000);

    renderHook(() => useRentExemption());

    // If the total rent exemption is greater than HRA, it should not exceed HRA
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 8000,
      type: "SET_RENT_DEDUCTED_AMOUNT",
    }); // HRA is 8000, so exemption can't be more than that
  });
});
