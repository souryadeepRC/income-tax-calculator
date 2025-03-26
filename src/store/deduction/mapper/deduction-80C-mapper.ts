import { DeductionEntry } from "src/types/deduction-types";
import { DEDUCTION_CHAPTER_VI_OPTIONS } from "src/constants/common-constants";

export const mapSaveDeductionEntry = (
  options: any,
  deductedAmount: number,
  payload: DeductionEntry
) => {
  const { id, amount, category } = payload;
  const entryIndex = options.findIndex((entry: any) => entry.id === id);

  let updatedAmount = 0;
  if (entryIndex > -1) {
    options[entryIndex] = {
      ...options[entryIndex],
      ...payload,
    };
    updatedAmount = deductedAmount - options[entryIndex].amount;
  } else {
    options.push(payload);
  }
  const deductedMaxLimit =
    DEDUCTION_CHAPTER_VI_OPTIONS[category]?.maxLimit || 0;
  const modifiedAmount = Math.min(amount, deductedMaxLimit);
  updatedAmount = updatedAmount + modifiedAmount;
  return {
    options,
    deductedAmount: updatedAmount,
  };
};
export const mapDeleteDeductionEntry = (
  options: any,
  deductedAmount: number,
  entryId: string
) => {
  const entryIndex = options.findIndex((entry: any) => entry.id === entryId);
  return {
    options: options.filter((entry: any) => entry.id !== entryId),
    deductedAmount: deductedAmount - options[entryIndex].amount,
  };
};
