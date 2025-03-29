import { render, screen, fireEvent } from "@testing-library/react";
import Deduction80C from "./Section80C";
import { useDispatch, useSelector } from "react-redux";
import DeductionEntryForm from "src/components/tax-deduction/deduction-entry/DeductionEntryForm";
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock(
  "src/components/tax-deduction/deduction-entry/DeductionEntryForm",
  () => ({
    __esModule: true,
    default: jest.fn(),
  })
);

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
const mockDeductionEntryForm = DeductionEntryForm as jest.MockedFunction<
  typeof DeductionEntryForm
>;
describe("test Deduction80C component", () => {
  const mockDispatch = jest.fn();
  const setup = (isEditable = false, editableEntryId = "") => {
    mockDeductionEntryForm.mockImplementation(({ entry, onSave, onReset }) => (
      <div>
        <span data-testid="mock-label">
          {entry ? "Existing Entry" : "New Entry"}
        </span>
        <button
          onClick={() =>
            onSave({
              category: "test",
              amount: 500,
            })
          }
          data-testid="mock-save-btn"
        >
          onSave
        </button>
        <button onClick={onReset} data-testid="mock-reset-btn">
          onReset
        </button>
      </div>
    ));
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({
      options: [
        { id: "1", category: "providentFund", amount: 1000 },
        { category: "ppf", amount: 2000 },
      ],
      deductedAmount: 0,
      isEditable,
      editableEntryId,
    });
    render(<Deduction80C />);
  };
  test("render the Deduction80C component with default content", () => {
    setup();
    expect(screen.getByText(/Provident Fund/i)).toBeInTheDocument();
    expect(screen.getByText(/1000/i)).toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId("deduction-edit-icon")[0]);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: "1",
      type: "EDIT_80C_ENTRY",
    });

    fireEvent.click(screen.getByTestId("add-deduction-btn"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "EDIT_80C_ENTRY",
    });

    fireEvent.click(screen.getAllByTestId("deduction-delete-icon")[0]);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: "1",
      type: "DELETE_80C_ENTRY",
    });

    fireEvent.click(screen.getAllByTestId("deduction-delete-icon")[1]);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: "",
      type: "DELETE_80C_ENTRY",
    });
  });
  test("editable mode entry form actions", () => {
    setup(true, "1");

    expect(screen.getByTestId("mock-label").textContent).toBe("Existing Entry");
    fireEvent.click(screen.getByTestId("mock-save-btn"));
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        amount: 500,
        category: "test",
      },
      type: "SAVE_80C_ENTRY",
    });

    fireEvent.click(screen.getByTestId("mock-reset-btn"));
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: "RESET_EDIT_80C_ENTRY",
    });
  });
  test("adding new deduction mode", () => {
    setup(true, "");
    expect(screen.getByTestId("mock-label").textContent).toBe("New Entry");
  });
});
