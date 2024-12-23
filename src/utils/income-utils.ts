import { IncomeOption } from "src/types/income-types";

export const calculateOverallAmount = (
  incomeOptions: IncomeOption[]
): number => {
  return incomeOptions.reduce((acc: number, { amount }: IncomeOption) => {
    return acc + amount;
  }, 0);
};
