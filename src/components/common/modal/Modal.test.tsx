import { render, screen } from "@testing-library/react";
import Modal from "./Modal";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
describe("test Modal component", () => {
  test("render the modal with default content and close functionality", () => {
    const mockOnClose = jest.fn();
    mockUseSelector.mockReturnValue("dark");
    render(
      <Modal onClose={mockOnClose}>
        <div>Test Child</div>
      </Modal>
    );

    expect(screen.getByTestId("modal-container")).toHaveAttribute(
      "data-theme",
      "dark"
    );
    expect(screen.getByText(/Test Child/i)).toBeInTheDocument();
  });
});
