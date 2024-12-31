import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { IncomeComponent } from "src/types/income-types";
import AddIncome from "./AddIncome";

// Mock the useSelector and useDispatch hooks
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
const mockedUseSelector = useSelector as jest.MockedFunction<
  typeof useSelector
>;
const mockedUseDispatch = useDispatch as jest.MockedFunction<
  typeof useDispatch
>;

describe("test AddIncome component", () => {
  beforeEach(() => {
    mockedUseSelector.mockClear();
    mockedUseDispatch.mockClear();
  });
  const setup = (editableIncome?: IncomeComponent) => {
    const storeEditableIncome = editableIncome || {
      amount: "",
      label: "",
      group: "salary",
    };
    mockedUseSelector.mockReturnValue(storeEditableIncome);

    const mockOnCancel = jest.fn();
    // Mock the dispatch function
    const mockDispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(mockDispatch);
    render(<AddIncome onCancel={mockOnCancel} />);
    return { mockDispatch, mockOnCancel };
  };
  const updateTextField = (testId: string, value: string) => {
    const element = screen.getByTestId(testId);
    fireEvent.change(element, { target: { value } });
  };
  const submitForm = () => {
    const submitBtn = screen.getByTestId("add-income-form-submit-btn");
    fireEvent.click(submitBtn);
  };
  test("render the form with label and fields", () => {
    setup();
    expect(screen.getByText("Income Category")).toBeInTheDocument();
    expect(
      screen.getByTestId("add-income-form-label-input"),
    ).toBeInTheDocument();

    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(
      screen.getByTestId("add-income-form-amount-input"),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Group")).toBeInTheDocument();
    expect(
      screen.getByTestId("add-income-form-submit-btn"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("add-income-form-submit-btn")).toHaveTextContent(
      "Add",
    );
    expect(
      screen.getByTestId("add-income-form-cancel-btn"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("add-income-form-cancel-btn")).toHaveTextContent(
      "Cancel",
    );
  });

  test("update fields with valid inputs and submit records", () => {
    const { mockDispatch } = setup();

    updateTextField("add-income-form-label-input", "Test Label");
    updateTextField("add-income-form-amount-input", "200");

    const groupSelect = screen.getByLabelText("Group");
    fireEvent.mouseDown(groupSelect);

    expect(screen.getByText("Extra Income")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Extra Income"));

    submitForm();
    expect(
      screen.queryByTestId("add-income-form-label-helper-text"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("add-income-form-amount-helper-text"),
    ).not.toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        amount: 200,
        category: "extra",
        label: "Test Label",
      },
      type: "SAVE_INCOME_DETAILS",
    });
  });
  test("update fields with invalid inputs and check submit validation", () => {
    const { mockDispatch } = setup();
    const labelErrorMessage = "Enter a label within min 100 characters";
    const amountErrorMessage =
      "Enter a valid amount more than 0 (e.g. 100.50 or 100)";
    // validate with :: default field value
    submitForm();

    expect(screen.getByText(labelErrorMessage)).toBeInTheDocument();
    expect(screen.getByText(amountErrorMessage)).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledTimes(0);

    // validate with :: character in amount field
    updateTextField("add-income-form-label-input", "Test Label");
    updateTextField("add-income-form-amount-input", "2Test00");

    submitForm();

    expect(screen.queryByText(labelErrorMessage)).not.toBeInTheDocument();
    expect(screen.getByText(amountErrorMessage)).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledTimes(0);

    // validate with :: empty record in label field

    updateTextField("add-income-form-label-input", "");
    updateTextField("add-income-form-amount-input", "200");

    submitForm();

    expect(screen.queryByText(amountErrorMessage)).not.toBeInTheDocument();
    expect(screen.getByText(labelErrorMessage)).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledTimes(0);

    // validate with :: exceeding char length in label and negative amount
    updateTextField(
      "add-income-form-label-input",
      Array(101).fill("T").join(""),
    );
    updateTextField("add-income-form-amount-input", "-10.30");

    submitForm();

    expect(screen.getByText(amountErrorMessage)).toBeInTheDocument();
    expect(screen.getByText(labelErrorMessage)).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });
  test("render submit button as text update for edit case", () => {
    setup({
      amount: "1000",
      label: "Basic",
      group: "salary",
    });

    expect(
      screen.getByTestId("add-income-form-submit-btn"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("add-income-form-submit-btn")).toHaveTextContent(
      "Add Income",
    );
  });
  test("type records in text field then clear the record", () => {
    setup();

    updateTextField("add-income-form-label-input", "Test Label");
    updateTextField("add-income-form-amount-input", "200");

    fireEvent.click(screen.getByTestId("clear-label-btn"));
    fireEvent.click(screen.getByTestId("clear-amount-btn"));

    expect(screen.getByTestId("add-income-form-label-input")).toHaveValue("");
    expect(screen.getByTestId("add-income-form-amount-input")).toHaveValue("");
  });
  test("type records in text field then cancel the form", () => {
    const { mockOnCancel } = setup();

    updateTextField("add-income-form-label-input", "Test Label");
    updateTextField("add-income-form-amount-input", "200");

    const labelInput = screen.getByTestId("add-income-form-label-input");
    expect(labelInput).toHaveValue("Test Label");
    fireEvent.click(screen.getByTestId("add-income-form-cancel-btn"));
    expect(mockOnCancel).toBeCalledTimes(1);
  });
});
