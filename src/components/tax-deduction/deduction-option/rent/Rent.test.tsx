import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import Rent from "./Rent";

// Mock dependencies
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock(
  "src/components/tax-deduction/deduction-entry/DeductionEntry",
  () => ({
    __esModule: true, // If it's a default export
    default: ({ onDelete, onModify, children }: any) => (
      <div>
        DeductionEntry
        <button data-testid="mock-delete-btn" onClick={onDelete}>
          onDelete
        </button>
        <button data-testid="mock-modify-btn" onClick={onModify}>
          onModify
        </button>
        {children}
      </div>
    ), // Return a valid React element
  })
);

jest.mock(
  "src/components/tax-deduction/deduction-option/rent/AddRentEntry",
  () => ({
    __esModule: true, // If it's a default export
    default: () => <div>AddRentEntry</div>, // Return a valid React element
  })
);

jest.mock(
  "src/components/tax-deduction/deduction-option/rent/RentEntryForm",
  () => ({
    __esModule: true, // If it's a default export
    default: () => <div>RentEntryForm</div>, // Return a valid React element
  })
);

jest.mock("src/hooks/useRentExemption", () => jest.fn());

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

describe("Rent component", () => {
  const mockCollections = [
    {
      id: "1",
      amount: 1000,
      duration: 3,
      isMetroCity: false,
    },
    {
      id: "2",
      amount: 2000,
      duration: 1,
      isMetroCity: true,
    },
    {
      amount: 2000,
      duration: 2,
      isMetroCity: true,
    },
  ];
  const mockDispatch = jest.fn();
  const setup = (editableEntryId: string) => {
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({
      collections: mockCollections,
      isEditable: true,
      editableEntryId,
    });

    render(<Rent />);
  };
  test("renders the Rent component with default content", () => {
    setup("1");
    expect(screen.getByText("Rs. 1000")).toBeInTheDocument();
    expect(screen.getByText("3 Months")).toBeInTheDocument();
    expect(screen.getByText("RentEntryForm")).toBeInTheDocument();
    expect(screen.getByText("AddRentEntry")).toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId("mock-delete-btn")[0]);
    expect(mockDispatch).toBeCalledWith({
      payload: "1",
      type: "DELETE_RENT_ENTRY",
    });

    fireEvent.click(screen.getAllByTestId("mock-modify-btn")[0]);
    expect(mockDispatch).nthCalledWith(2, {
      payload: "1",
      type: "EDIT_RENT_ENTRY",
    });
  });
  test("renders the Rent component with different editable entry", () => {
    setup("5");
  });
});
