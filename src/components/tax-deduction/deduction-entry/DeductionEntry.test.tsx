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
      </DeductionEntry>
    );
    expect(screen.getByText(/Test Child/i)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("deduction-delete-icon"));
    expect(mockOnDelete).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("deduction-edit-icon"));
    expect(mockOnModify).toHaveBeenCalled();
  });
});
