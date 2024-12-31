import { render, screen, fireEvent } from "@testing-library/react";
import RentEntryForm from "./RentEntryForm";
import { useDispatch, useSelector } from "react-redux";
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
describe("test RentEntryForm component", () => {
  const mockRentEntry = {
    duration: "6",
    amount: "100",
    isMetroCity: false,
  };
  const mockDispatch = jest.fn();
  beforeEach(() => {
    mockUseDispatch.mockReturnValue(mockDispatch);
  });
  test("render the RentEntryForm component with valid entry and update the amount", () => {
    render(<RentEntryForm durationLeft={5} rentEntry={mockRentEntry} />);

    const amountInput = screen.getByTestId("rent-amount-input");
    expect(amountInput).toHaveValue(100);

    const durationInput = screen.getByTestId("rent-duration-input");
    expect(durationInput).toHaveValue(6);

    fireEvent.change(amountInput, { target: { value: "" } });
    fireEvent.change(durationInput, { target: { value: "9" } });

    fireEvent.click(screen.getByTestId("rent-form-save-btn"));
    expect(
      screen.getByText(/Enter a valid amount more than 0/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Cannot add more than 12 months/i)
    ).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();

    fireEvent.change(durationInput, { target: { value: "" } });
    expect(
      screen.getByText(/Enter a valid duration more than 0/i)
    ).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();

    fireEvent.change(amountInput, { target: { value: "200" } });
    fireEvent.change(durationInput, { target: { value: "4" } });

    fireEvent.click(screen.getByTestId("rent-city-switch"));

    fireEvent.click(screen.getByTestId("rent-form-save-btn"));
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { amount: 200, duration: 4, isMetroCity: true },
      type: "SAVE_RENT_ENTRY",
    });
  });
  test("validate with new rent entry case and cancel functionality", () => {
    render(<RentEntryForm durationLeft={5} rentEntry={undefined} />);
    fireEvent.click(screen.getByTestId("rent-form-save-btn"));
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(
      screen.getByText(/Enter a valid amount more than 0/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Enter a valid duration more than 0/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("rent-form-cancel-btn"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RESET_EDIT_RENT_ENTRY",
    });
  });

  test("validate edit rent Entry with no amount", () => {
    render(
      <RentEntryForm
        durationLeft={5}
        rentEntry={{ duration: "6", amount: "", isMetroCity: false }}
      />
    );
    fireEvent.click(screen.getByTestId("rent-form-save-btn"));
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(
      screen.getByText(/Enter a valid amount more than 0/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Enter a valid duration more than 0/i)
    ).not.toBeInTheDocument();
  });

  test("validate edit rent Entry with no duration", () => {
    render(
      <RentEntryForm
        durationLeft={5}
        rentEntry={{ duration: "", amount: "100", isMetroCity: false }}
      />
    );
    fireEvent.click(screen.getByTestId("rent-form-save-btn"));
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(
      screen.queryByText(/Enter a valid amount more than 0/i)
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/Enter a valid duration more than 0/i)
    ).toBeInTheDocument();
  });
});
