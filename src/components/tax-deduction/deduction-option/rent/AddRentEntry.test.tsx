import { fireEvent, render, screen } from "@testing-library/react";
import AddRentEntry from "./AddRentEntry";
import { useDispatch, useSelector } from "react-redux";
import { selectRentEligibleDetails } from "src/store/income/income-selectors";
import { selectRentDeduction } from "src/store/deduction/deduction-selectors";
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
describe("test AddRentEntry component", () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    mockUseDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });
  test("render the AddRentEntry component with default content", () => {
    const mockData1 = { deductedAmount: 1000 };
    const mockData2 = { basic: 5000, hra: 2000 };
    mockUseSelector.mockImplementation((selector) => {
      if (selector === selectRentDeduction) return mockData1;
      if (selector === selectRentEligibleDetails) return mockData2;
      return undefined;
    });

    render(<AddRentEntry />);
    expect(screen.getByTestId("add-rent-btn")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("add-rent-btn"));
    expect(mockDispatch).toBeCalledWith({
      payload: undefined,
      type: "EDIT_RENT_ENTRY",
    });
  });
  test("show the default message for no basic hra case", () => {
    const mockData1 = { deductedAmount: 1000 };
    const mockData2 = { basic: 0, hra: 0 };
    mockUseSelector.mockImplementation((selector) => {
      if (selector === selectRentDeduction) return mockData1;
      if (selector === selectRentEligibleDetails) return mockData2;
      return undefined;
    });

    render(<AddRentEntry />);
    expect(screen.queryByTestId("add-rent-btn")).not.toBeInTheDocument();
    expect(
      screen.getByText(/include the basic salary and HRA components/i),
    ).toBeInTheDocument();
  });
});
