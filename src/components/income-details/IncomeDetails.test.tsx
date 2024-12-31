import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { calculateOverallAmount } from "src/utils/income-utils";
import BreakdownComponent from "./BreakdownComponent";
import IncomeBreakdown from "./IncomeBreakdown";
import IncomeEditModal from "./IncomeEditModal";
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("src/utils/income-utils", () => ({
  calculateOverallAmount: jest.fn(),
}));
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockCalculateOverallAmount =
  calculateOverallAmount as jest.MockedFunction<typeof calculateOverallAmount>;
describe("test BreakdownComponent component", () => {
  test("render the breakdown component with default content and check edit delete function", () => {
    const mockDispatchFunction = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatchFunction);
    render(
      <BreakdownComponent
        id="test-id"
        category="salary"
        label="test label"
        amount={100}
      />
    );
    expect(screen.getByText(/test label/i)).toBeInTheDocument();
    expect(screen.getByText(/Rs. 100/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("MoreVertIcon"));
    fireEvent.click(screen.getByTestId("menu-item-Modify"));
    expect(mockDispatchFunction).toHaveBeenNthCalledWith(1, {
      payload: "test-id",
      type: "EDIT_INCOME_ENTRY",
    });

    fireEvent.click(screen.getByTestId("MoreVertIcon"));
    fireEvent.click(screen.getByTestId("menu-item-Remove"));
    expect(mockDispatchFunction).toHaveBeenNthCalledWith(2, {
      payload: "test-id",
      type: "DELETE_INCOME_DETAILS",
    });
  });
});
describe("test IncomeBreakdown component", () => {
  test("render the ui with default content", () => {
    mockUseSelector.mockReturnValue([
      { id: "test-id", category: "salary", label: "test label", amount: 100 },
      { category: "extra", label: "test extra label", amount: 100 },
    ]);
    mockCalculateOverallAmount.mockReturnValue(1000);
    const mockDataSelector = jest.fn();
    render(<IncomeBreakdown group="salary" dataSelector={mockDataSelector} />);

    expect(screen.getByText(/salary Income/i)).toBeInTheDocument();
    expect(screen.getByText("Rs.1000")).toBeInTheDocument();
    expect(screen.getByText(/test label/i)).toBeInTheDocument();
  });
});

describe("test IncomeEditModal component", () => {
  test("render the modal with default content and edit functionality", () => {
    const mockOnClose = jest.fn();
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({
      amount: 500,
      label: "Test label",
      category: "salary",
    });
    render(<IncomeEditModal onCancel={mockOnClose} />);

    expect(screen.getByText(/Edit Test label Details/i)).toBeInTheDocument();
    expect(screen.getByText("Previous Amount: Rs. 500")).toBeInTheDocument();
    expect(screen.getByTestId("edit-income-amount-input")).toHaveValue("500");

    fireEvent.change(screen.getByTestId("edit-income-amount-input"), {
      target: { value: "1000" },
    });
    expect(screen.getByTestId("edit-income-amount-input")).toHaveValue("1000");

    fireEvent.click(screen.getByTestId("edit-income-cancel"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    fireEvent.change(screen.getByTestId("edit-income-amount-input"), {
      target: { value: "10Test00" },
    });
    expect(
      screen.getByText("Enter a valid amount more than 0 (e.g. 100.50 or 100)")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("edit-income-save"));
    expect(mockDispatch).not.toHaveBeenCalled();

    fireEvent.change(screen.getByTestId("edit-income-amount-input"), {
      target: { value: "2000" },
    });
    expect(screen.getByTestId("edit-income-amount-input")).toHaveValue("2000");
    fireEvent.click(screen.getByTestId("edit-income-save"));
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { amount: 2000, category: "salary", label: "Test label" },
      type: "SAVE_INCOME_DETAILS",
    });
  });
});
