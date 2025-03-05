import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import IncomePage from "./IncomePage";
import IncomeBreakdown from "src/components/income-details/IncomeBreakdown";
import AddIncome from "src/components/income-details/add-income/AddIncome";
import IncomeEditModal from "src/components/income-details/IncomeEditModal";

jest.mock("src/components/income-details/IncomeBreakdown", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked IncomeBreakdown</div>),
}));
jest.mock("src/components/income-details/IncomeEditModal", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked IncomeEditModal </div>),
}));
jest.mock("src/components/add-income/AddIncome", () => ({
  __esModule: true,
  default: jest.fn(({ onCancel }) => (
    <div>
      Mocked AddIncome
      <button data-testid="cancel-btn" onClick={onCancel}>
        Cancel
      </button>
    </div>
  )),
}));
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockIncomeBreakdown = IncomeBreakdown as jest.MockedFunction<
  typeof IncomeBreakdown
>;
const mockAddIncome = AddIncome as jest.MockedFunction<typeof AddIncome>;
const mockIncomeEditModal = IncomeEditModal as jest.MockedFunction<
  typeof IncomeEditModal
>;
describe("test IncomePage component", () => {
  test("render the page with default content and click the add income", () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({
      overallAmount: 500,
      isEditable: false,
      editableEntryId: "",
    });
    render(<IncomePage />);

    expect(screen.getByText(/Annual Income/i)).toBeInTheDocument();
    expect(screen.getByText("Rs. 500")).toBeInTheDocument();
    expect(mockIncomeBreakdown).toHaveBeenCalledTimes(2);
    fireEvent.click(screen.getByTestId("add-income-btn"));
    expect(mockDispatch).toBeCalledWith({
      payload: undefined,
      type: "EDIT_INCOME_ENTRY",
    });
  });
  test("render the page with Add Income Modal Open", () => {
    mockAddIncome.mockImplementation(({ onCancel }) => (
      <div>
        Mocked AddIncome{" "}
        <button data-testid="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    ));
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({
      overallAmount: 500,
      isEditable: true,
      editableEntryId: "",
    });
    render(<IncomePage />);

    expect(mockAddIncome).toHaveBeenCalledTimes(1);
    expect(mockIncomeEditModal).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByTestId("cancel-btn"));
    expect(mockDispatch).toBeCalledWith({
      payload: undefined,
      type: "RESET_EDIT_INCOME_ENTRY",
    });
  });
  test("render the page with Edit Income Modal Open", () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({
      overallAmount: 500,
      isEditable: true,
      editableEntryId: "1",
    });
    render(<IncomePage />);

    expect(mockAddIncome).toHaveBeenCalledTimes(0);
    expect(mockIncomeEditModal).toHaveBeenCalledTimes(1);
  });
});
