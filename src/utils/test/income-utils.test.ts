import { IncomeOption } from "src/types/income-types";
import { calculateOverallAmount } from "../income-utils";

describe("test Income utils", () => {
  test("validate calculateOverallAmount with valid income data", () => {
    const incomeOptions: IncomeOption[] = [
      { id: "1", label: "Test Label 1", amount: 100, category: "salary" },
      { label: "Test Label 2", amount: 200.2, category: "extra" },
    ];
    expect(calculateOverallAmount(incomeOptions)).toEqual(300.2);
    expect(calculateOverallAmount([])).toEqual(0);
  });
});
