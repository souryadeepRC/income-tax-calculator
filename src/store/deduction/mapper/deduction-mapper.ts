import { SECTION_24_MAX_LIMIT } from "src/constants/common-constants";
import {
  DeductionEntry,
  RentEntry,
  DeductionType,
  Section24Entry,
  DeductionReducerType,
} from "src/types/deduction-types";

export interface DeductionResponse {
  id: string;
  type: DeductionType;
  amount: number;
  maxLimit: number;
  category: string;
  duration: number;
}
type DeductionDetails = {
  rent: {
    options: RentEntry[];
    deductedAmount: number;
  };
  section24: {
    deductedAmount: number;
    options: Section24Entry[];
  };
  deduction80C: {
    deductedAmount: number;
    options: DeductionEntry[];
  };
  deductionByChapter6: {
    deductedAmount: number;
    options: DeductionEntry[];
  };
};
const mapRent = (acc: DeductionDetails, option: DeductionResponse) => {
  return {
    ...acc,
    rent: {
      deductedAmount: (acc?.rent?.deductedAmount || 0) + option.amount,
      options: [
        ...(acc?.rent?.options || []),
        {
          id: option?.id,
          amount: option?.amount || 0,
          duration: option?.duration || 0,
          isMetroCity: option?.category === "Metro",
        },
      ],
    },
  };
};
const mapSection24 = (acc: DeductionDetails, option: DeductionResponse) => {
  const { amount } = option;
  const updatedAmount = (acc?.section24?.deductedAmount || 0) + amount;
  const maxLimit = SECTION_24_MAX_LIMIT;
  const effectiveAmount = updatedAmount > maxLimit ? maxLimit : updatedAmount;
  return {
    ...acc,
    section24: {
      deductedAmount: effectiveAmount,
      options: [
        ...(acc?.section24?.options || []),
        {
          id: option?.id,
          amount: amount,
        },
      ],
    },
  };
};
const mapOther = (type: string, acc: any, option: DeductionResponse) => {
  const { amount = 0, maxLimit = 0 } = option || {};
  const effectiveAmount = maxLimit > 0 && amount > maxLimit ? maxLimit : amount;
  return {
    ...acc,
    [type]: {
      deductedAmount: (acc?.[type]?.deductedAmount || 0) + effectiveAmount,
      options: [
        ...(acc?.[type]?.options || []),
        {
          id: option?.id,
          category: option?.category || "",
          amount: amount,
          maxLimit: maxLimit,
        },
      ],
    },
  };
};
export const mapDeductions = (
  state: DeductionReducerType,
  deductions: DeductionResponse[]
): DeductionReducerType => {
  const details = deductions.reduce(
    (acc: DeductionDetails, option: DeductionResponse) => {
      const { type } = option;
      if (type === "Rent") {
        return mapRent(acc, option);
      } else if (type === "Section24") {
        return mapSection24(acc, option);
      } else if (type === "80C") {
        return mapOther("deduction80C", acc, option);
      } else if (type === "Chapter6A") {
        return mapOther("deductionByChapter6", acc, option);
      }
      return acc;
    },
    {
      rent: { deductedAmount: 0, options: [] },
      section24: { deductedAmount: 0, options: [] },
      deduction80C: { deductedAmount: 0, options: [] },
      deductionByChapter6: { deductedAmount: 0, options: [] },
    }
  );
  return {
    ...state,
    rent: {
      ...state.rent,
      ...details.rent,
    },
    section24: {
      ...state.section24,
      ...details.section24,
    },
    section80C: {
      ...state.section80C,
      ...details.deduction80C,
    },
    chapter6: {
      ...state.chapter6,
      ...details.deductionByChapter6,
    },
  };
};
