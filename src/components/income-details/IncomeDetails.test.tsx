import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { calculateOverallAmount } from "src/utils/income-utils";
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
