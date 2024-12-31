import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import DeductionPage from "src/pages/deduction-page/DeductionPage";
import DataLayout from "src/components/layout/DataLayout";
import DeductionOption from "./DeductionOption";
import { MemoryRouter } from "react-router";
jest.mock("src/components/layout/DataLayout", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const MockDataLayout = DataLayout as jest.MockedFunction<typeof DataLayout>;
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

const mockDispatch = jest.fn();
describe("DeductionPage Component", () => {
  test("render the header with expected overall amount", () => {
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({
      rentDeduction: 2000,
      deductionSection24: 2000,
      deduction80C: 2000,
      deductionChapter6: 2000,
      total: 8000,
    });

    render(<DeductionPage />);

    expect(mockUseSelector).toHaveBeenCalledTimes(1);
    expect(MockDataLayout).toHaveBeenCalledTimes(1);
  });
});
describe("DeductionOption Component", () => {
  test("render the deduction options with label", () => {
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({
      rentDeduction: 2000,
      deductionSection24: 3000,
      deduction80C: 4000,
      deductionChapter6: 5000,
      total: 14000,
    });

    render(
      <MemoryRouter>
        <DeductionOption />
      </MemoryRouter>
    );

    expect(mockUseSelector).toHaveBeenCalledTimes(1);
    const rentItem = screen.getByText(/Rent/).closest("li");
    expect(rentItem).toHaveTextContent("Rent");
    expect(rentItem).toHaveTextContent("Rs. 2000");
  });
});
