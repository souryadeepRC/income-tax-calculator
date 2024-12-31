import { DeductionEntry } from "src/types/deduction-types";

export const getDeductedAmount = (
  options: DeductionEntry[],
  overallMaxLimit: number = Infinity,
) => {
  const deductedAmount: number = options.reduce(
    (acc: number, option: DeductionEntry) => {
      const { maxLimit = Infinity, amount } = option;

      return acc + (amount > maxLimit ? maxLimit : amount);
    },
    0,
  );

  return deductedAmount > overallMaxLimit ? overallMaxLimit : deductedAmount;
};
