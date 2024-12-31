import { render, screen, fireEvent } from "@testing-library/react";
import DeductionEntry from "./DeductionEntry";
import AddDeductionEntry from "./AddDeductionEntry";

describe("test DeductionEntry component", () => {
  test("render the DeductionEntry component with default content and action icons", () => {
    const mockOnDelete = jest.fn();
    const mockOnModify = jest.fn();
    render(
      <DeductionEntry onDelete={mockOnDelete} onModify={mockOnModify}>
        Test Child
      </DeductionEntry>,
    );
    expect(screen.getByText(/Test Child/i)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("deduction-delete-icon"));
    expect(mockOnDelete).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("deduction-edit-icon"));
    expect(mockOnModify).toHaveBeenCalled();
  });
});

describe("test AddDeductionEntry component", () => {
  test("render the AddDeductionEntry component with default content and action icons", () => {
    const mockOnAddDeduction = jest.fn();
    render(
      <AddDeductionEntry
        deductedAmount={100}
        deductionSection="Sample"
        onAddDeduction={mockOnAddDeduction}
      />,
    );
    expect(
      screen.getByText("You will get an exemption of Rs.100 from Sample"),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("add-deduction-btn"));
    expect(mockOnAddDeduction).toHaveBeenCalled();
  });
});
