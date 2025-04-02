import { initialState } from "src/store/deduction/deduction-reducer";
import {
  DEDUCTION_CHAPTER_VI_OPTIONS,
  DEDUCTION_TYPE,
  SECTION_24_MAX_LIMIT,
  SECTION_80C_MAX_LIMIT,
} from "src/constants/common-constants";
import {
  DeductionEntries,
  DeductionEntriesType,
  DeductionOption,
  DeductionReducerType,
  DeductionResponse,
  RentOption,
} from "src/types/deduction-types";

const mapRent = (acc: DeductionEntries, option: DeductionResponse) => {
  return {
    ...acc,
    rent: {
      deductedAmount: (acc?.rent?.deductedAmount || 0) + option.amount,
      options: [
        ...(acc?.rent?.options || []),
        {
          id: option.id,
          amount: option.amount || 0,
          duration: option?.duration || 0,
          isMetroCity: option.category === "Metro",
        },
      ],
    },
  };
};
const mapSection24 = (acc: DeductionEntries, option: DeductionResponse) => {
  const { amount } = option;
  return {
    ...acc,
    section24: {
      deductedAmount: getDeductedAmount(option, acc.section24.deductedAmount),
      options: [
        ...acc.section24.options,
        {
          id: option.id,
          amount: amount,
        },
      ],
    },
  };
};
const mapOther = (type: string) => (acc: any, option: DeductionResponse) => {
  const { amount = 0 } = option;
  return {
    ...acc,
    [type]: {
      deductedAmount: getDeductedAmount(
        option,
        acc?.[type]?.deductedAmount || 0
      ),
      options: [
        ...(acc?.[type]?.options || []),
        {
          id: option.id,
          category: option.category,
          amount: amount,
        },
      ],
    },
  };
};
const mapDeductions = (
  state: DeductionReducerType,
  deductions: DeductionResponse[]
): DeductionReducerType => {
  const initialDetails = initialState.entries;

  const deductionMap: Record<string, Function> = {
    [DEDUCTION_TYPE.RENT]: mapRent,
    [DEDUCTION_TYPE.SECTION_24]: mapSection24,
    [DEDUCTION_TYPE.SECTION_80C]: mapOther("section80C"),
    [DEDUCTION_TYPE.CHAPTER_VIA]: mapOther("chapter6"),
  };
  const details = deductions.reduce(
    (acc: DeductionEntries, option: DeductionResponse) => {
      const handler = deductionMap[option.type];
      return handler ? handler(acc, option) : acc;
    },
    initialDetails
  );

  return {
    ...state,
    entries: details,
  };
};
const getDeductedAmount = (
  option: DeductionResponse,
  deductedAmount: number
) => {
  const { type, amount, category } = option;
  if (type === DEDUCTION_TYPE.SECTION_24) {
    const updatedAmount = deductedAmount + amount;
    return Math.min(updatedAmount, SECTION_24_MAX_LIMIT);
  } else if (type === DEDUCTION_TYPE.SECTION_80C) {
    const updatedAmount = deductedAmount + amount;
    return Math.min(updatedAmount, SECTION_80C_MAX_LIMIT);
  } else if (type === DEDUCTION_TYPE.CHAPTER_VIA) {
    const effectiveAmount = Math.min(
      amount,
      DEDUCTION_CHAPTER_VI_OPTIONS[category]?.maxLimit || Infinity
    );
    return deductedAmount + effectiveAmount;
  }
};
type mapEntryData =
  | {
      options?: RentOption[];
      deductedAmount?: number;
    }
  | { options?: DeductionOption[]; deductedAmount?: number };

const mapEntry = (
  state: DeductionReducerType,
  type: DeductionEntriesType,
  data: mapEntryData
) => {
  return {
    ...state.entries,
    [type]: {
      ...(state?.entries?.[type] || {}),
      ...data,
    },
  };
};
export { mapDeductions, mapEntry };
