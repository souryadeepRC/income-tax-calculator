import { IncomeOption } from "src/types/income-types";

export const calculateOverallAmount = (incomeOptions: IncomeOption[]): number =>
  incomeOptions.reduce(
    (acc: number, { amount }: IncomeOption) => acc + amount,
    0
  );
