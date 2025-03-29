import { IncomeOption } from "src/types/income-types";
import { calculateOverallAmount } from "../income-utils";

describe("test Income utils", () => {
  test("validate calculateOverallAmount with valid income data", () => {
    const incomeOptions: IncomeOption[] = [
      { id: "1", category: "Test Category 1", amount: 100, group: "salary" },
      { id: "2",category: "Test Category 2", amount: 200.2, group: "extra" },
    ];
    expect(calculateOverallAmount(incomeOptions)).toEqual(300.2);
    expect(calculateOverallAmount([])).toEqual(0);
  });
});
