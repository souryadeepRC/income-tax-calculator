import { getDeductedAmount } from "../deduction-utils";

describe("test deduction utils", () => {
  test("validate getDeductedAmount for no maxLimit options", () => {
    const options = [
      { id: "1", category: "Test1", amount: 100.1 },
      { id: "2", category: "Test2", amount: 200.1 },
    ];
    expect(getDeductedAmount(options)).toEqual(300.2);
    expect(getDeductedAmount(options, 50)).toEqual(50);
    expect(getDeductedAmount(options, 500)).toEqual(300.2);
  });
  test("validate getDeductedAmount for maxLimit options", () => {
    const options = [
      { id: "1", category: "Test1", amount: 100.1 },
      { id: "2", category: "Test2", amount: 200.1, maxLimit: 50 },
      { id: "3", category: "Test3", amount: 300, maxLimit: 500 },
    ];
    expect(getDeductedAmount(options)).toEqual(450.1);
    expect(getDeductedAmount(options, 50)).toEqual(50);
    expect(getDeductedAmount(options, 500)).toEqual(450.1);
  });
});
