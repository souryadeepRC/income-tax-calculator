import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import Rent from "./Rent";

// Mock dependencies
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock(
  "src/components/tax-deduction/deduction-option/rent/RentCollection",
  () => ({
    __esModule: true, // If it's a default export
    default: () => <div>RentCollection</div>, // Return a valid React element
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
      duration: 6,
      isMetroCity: true,
    },
  ];
  const setup = (editableEntryId: string) => {
    mockUseSelector.mockReturnValue({
      collections: mockCollections,
      isEditable: true,
      editableEntryId,
    });

    render(<Rent />);
  };
  test("renders the Rent component with default content", () => {
    setup("1");
    // Check if RentCollection and RentEntryForm are rendered
    expect(screen.getByText("RentCollection")).toBeInTheDocument();
    expect(screen.getByText("RentEntryForm")).toBeInTheDocument();
    expect(screen.getByText("AddRentEntry")).toBeInTheDocument();
  });
  test("renders the Rent component with different editable entry", () => {
    setup("5");
  });
});
