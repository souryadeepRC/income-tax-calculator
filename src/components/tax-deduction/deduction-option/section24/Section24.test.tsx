import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import Section24 from "./Section24"; 

// Mocking useSelector to return specific values for our tests
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mocking the action
jest.mock("src/store/deduction/deduction-reducer", () => ({
  updateSection24Deduction: jest.fn(),
}));
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
describe("Section24 Component", () => {
  test("should render the exemption amount and input field", () => {
    // Mocking useSelector return value for the deduction section24 state
    mockUseSelector.mockReturnValue({
      amount: 1000,
      deductedAmount: 500,
    });

    render(<Section24 />);

    // Check that the exemption amount is displayed correctly
    expect(
      screen.getByText("You will get an exemption of Rs.500 from Section 24")
    ).toBeInTheDocument();

    // Check that the input field is pre-populated with the amount from the state
    expect(screen.getByTestId("section24-input")).toHaveValue(1000);
  });

  test("should show an error message for invalid input", () => {
    // Mocking useSelector return value
    mockUseSelector.mockReturnValue({
      amount: 1000,
      deductedAmount: 500,
    });

    render(<Section24 />);

    // Get the input field
    const input = screen.getByTestId("section24-input");

    // Simulate entering an invalid value
    fireEvent.change(input, { target: { value: "invalid" } });

    // Check that the error message is displayed
    expect(
      screen.getByText("Enter a valid amount more than 0 (e.g. 100.50 or 100)")
    ).toBeInTheDocument();
  });

  test("should clear the input when the cancel icon is clicked", () => {
    // Mocking useSelector return value
    mockUseSelector.mockReturnValue({
      amount: 0,
      deductedAmount: 500,
    });

    render(<Section24 />);

    fireEvent.change(screen.getByTestId("section24-input"), {
      target: { value: "1000" },
    });
    expect(screen.getByTestId("section24-input")).toHaveValue(1000);
    // Simulate a click on the cancel icon to clear the input
    fireEvent.click(screen.getByTestId("clear-section24-input"));

    // Check that the input value is cleared
    expect(screen.getByTestId("section24-input")).toHaveValue(null);
  });

  test("should dispatch updateSection24Deduction on save button click", () => {
    // Mocking useSelector return value
    mockUseSelector.mockReturnValue({
      amount: 1000,
      deductedAmount: 500,
    });

    const dispatch = jest.fn();
    mockDispatch.mockReturnValue(dispatch);

    render(<Section24 />);

    // Get the save button and input field
    const saveButton = screen.getByText("Save");
    const input = screen.getByTestId("section24-input");

    // Simulate entering a valid amount
    fireEvent.change(input, { target: { value: "1500" } });

    // Simulate clicking the save button
    fireEvent.click(saveButton);

    // Check that the updateSection24Deduction action was called with the correct value 
  });
});
