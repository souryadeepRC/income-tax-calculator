import { fireEvent, render, screen } from "@testing-library/react";
import Switch from "./Switch";

describe("Switch Component", () => {
  const mockOnChange = jest.fn();
  const renderSWitch = (checked: boolean): HTMLElement => {
    render(<Switch checked={checked} onChange={mockOnChange} />);
    return screen.getByRole("checkbox");
  };
  test("render the switch component with default props", () => {
    const checkBoxElement = renderSWitch(false);

    expect(checkBoxElement).toBeInTheDocument();
    expect(checkBoxElement).not.toBeChecked();

    fireEvent.click(checkBoxElement);
    expect(mockOnChange).toHaveBeenCalled();
  });
  test("validate the checked case", () => {
    const checkBoxElement = renderSWitch(true);

    expect(checkBoxElement).toBeInTheDocument();
    expect(checkBoxElement).toBeChecked();
  });
});
