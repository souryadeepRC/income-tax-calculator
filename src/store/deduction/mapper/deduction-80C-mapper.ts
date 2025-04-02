import { DeductionOption } from "src/types/deduction-types";
import { DEDUCTION_CHAPTER_VI_OPTIONS } from "src/constants/common-constants";

const getEffectiveAmount = (category: string, amount: number) => {
  const deductedMaxLimit =
    DEDUCTION_CHAPTER_VI_OPTIONS[category]?.maxLimit || 0;
  return Math.min(amount, deductedMaxLimit);
};
export const mapChapter6EntrySave = (
  { options, deductedAmount }: any,
  payload: DeductionOption
) => {
  const { id, amount, category } = payload;
  const entryIndex = options.findIndex((entry: any) => entry.id === id);

  let updatedAmount = 0;
  if (entryIndex > -1) {
    const { category, amount: previousAmount } = options[entryIndex];
    updatedAmount =
      deductedAmount - getEffectiveAmount(category, previousAmount);
    options[entryIndex] = {
      ...options[entryIndex],
      ...payload,
    };
  } else {
    options.push(payload);
  }
  updatedAmount = updatedAmount + getEffectiveAmount(category, amount);
  return {
    options,
    deductedAmount: updatedAmount,
  };
};
export const mapChapter6EntryDeletion = (
  { options, deductedAmount }: any,
  entryId: string
) => {
  const entryIndex = options.findIndex((entry: any) => entry.id === entryId);
  const { category, amount: previousAmount } = options[entryIndex];
  return {
    options: options.filter((entry: any) => entry.id !== entryId),
    deductedAmount:
      deductedAmount - getEffectiveAmount(category, previousAmount),
  };
};
