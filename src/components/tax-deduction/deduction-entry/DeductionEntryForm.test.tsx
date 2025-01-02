import { render, screen, fireEvent } from "@testing-library/react";
import DeductionEntryForm from "./DeductionEntryForm";

describe("test DeductionEntryForm component", () => {
  const deductionOptions = [
    { label: "Test 1", category: "sample1", isAdded: false, maxLimit: 1000 },
    { label: "Test 2", category: "sample2", isAdded: true },
    { label: "Test 3", category: "sample3", isAdded: true, maxLimit: 2000 },
  ];
  const mockDeductionEntry = {
    category: "sample1",
    amount: "100",
    maxLimit: 1000,
  };
  const mockOnSave = jest.fn();
  const mockOnReset = jest.fn();
  test("render the DeductionEntryForm component with valid entry and update the amount", () => {
    render(
      <DeductionEntryForm
        options={deductionOptions}
        entry={mockDeductionEntry}
        onSave={mockOnSave}
        onReset={mockOnReset}
      />
    );
    expect(screen.getByTestId("category-option")).toBeInTheDocument();

    const amountInput = screen.getByTestId("deduction-amount-input");
    expect(amountInput).toHaveValue(100);

    fireEvent.change(amountInput, { target: { value: "" } });
    fireEvent.click(screen.getByTestId("deduction-form-save-btn"));
    expect(screen.getByText("Amount cannot be empty")).toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();

    fireEvent.change(amountInput, { target: { value: "200" } });
    fireEvent.change(amountInput, { target: { value: "2Test00" } });
    expect(
      screen.getByText("Enter a valid amount more than 0 (e.g. 100.50 or 100)")
    ).toBeInTheDocument();
    fireEvent.change(amountInput, { target: { value: 200 } });
    expect(amountInput).toHaveValue(200);

    fireEvent.click(screen.getByTestId("deduction-form-save-btn"));
    expect(mockOnSave).toHaveBeenCalled();
  });
  test("render the DeductionEntryForm component with empty entry", () => {
    render(
      <DeductionEntryForm
        options={deductionOptions}
        entry={undefined}
        onSave={mockOnSave}
        onReset={mockOnReset}
      />
    );
    const amountInput = screen.getByTestId("deduction-amount-input");
    expect(amountInput).toHaveValue(null);
  });
  test("validate the category change case", () => {
    render(
      <DeductionEntryForm
        options={deductionOptions}
        entry={{
          category: "",
          amount: "100",
        }}
        onSave={mockOnSave}
        onReset={mockOnReset}
      />
    );

    fireEvent.click(screen.getByTestId("deduction-form-save-btn"));
    expect(
      screen.queryByText("Amount cannot be empty")
    ).not.toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();
  });
  test("validate the no max limit entry case", () => {
    render(
      <DeductionEntryForm
        options={deductionOptions}
        entry={{
          category: "sample1",
          amount: "100",
        }}
        onSave={mockOnSave}
        onReset={mockOnReset}
      />
    );

    fireEvent.click(screen.getByTestId("deduction-form-save-btn"));
    expect(mockOnSave).toHaveBeenCalled();
  });
});
