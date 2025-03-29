import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import IncomePage from "./IncomePage";
import AddIncome from "src/components/income-details/AddIncome";
import EditIncome from "src/components/income-details/EditIncome";

jest.mock("src/components/income-details/EditIncome", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked EditIncome </div>),
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

const mockAddIncome = AddIncome as jest.MockedFunction<typeof AddIncome>;
const mockIncomeEditModal = EditIncome as jest.MockedFunction<
  typeof EditIncome
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
    fireEvent.click(screen.getByTestId("add-income-btn"));
    expect(mockDispatch).toBeCalledWith({
      payload: undefined,
      type: "EDIT_INCOME_ENTRY",
    });
  });
  test("render the page with Add Income Modal Open", () => {
    mockAddIncome.mockImplementation(() => (
      <div>
        Mocked AddIncome <button data-testid="cancel-btn">Cancel</button>
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
