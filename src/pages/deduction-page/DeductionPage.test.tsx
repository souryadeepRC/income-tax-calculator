import { render, screen, within } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import DeductionPage from "src/pages/deduction-page/DeductionPage";
import { MemoryRouter } from "react-router";
jest.mock("src/components/layout/DataLayout", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
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
  });
});
