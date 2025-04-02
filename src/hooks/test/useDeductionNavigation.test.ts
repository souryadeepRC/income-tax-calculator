import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import useDeductionNavigation from "../useDeductionNavigation";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

describe("useTaxCalculation", () => {
  // Mocking return values for selectors
  beforeEach(() => {
    mockUseSelector.mockReturnValue({
      rent: 100,
      section24: 500,
      section80C: 600,
      chapter6: 700,
      others: 800,
    });
  });

  test("configure deduction navigation list with amount", () => {
    const { result } = renderHook(() => useDeductionNavigation());
    expect(result.current).toEqual([
      { key: "rent", title: "Rent", path: "/deduction/rent", amount: 100 },
      {
        key: "section24",
        title: "Section 24",
        path: "/deduction/section-24",
        amount: 500,
      },
      {
        key: "section80C",
        title: "Section 80C",
        path: "/deduction/section-80C",
        amount: 600,
      },
      {
        key: "chapter6",
        title: "Chapter VIA",
        path: "/deduction/chapter-VIA",
        amount: 700,
      },
      {
        key: "others",
        title: "Others",
        path: "/deduction/others",
        amount: 800,
      },
    ]);
  });
});
