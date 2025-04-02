import {
  DeductionEntry,
  DeductionOption,
  RentOption,
} from "src/types/deduction-types";

export const mapRentOptions = (
  rentOptions: RentOption[],
  payload: RentOption
): RentOption[] => {
  const options = [...rentOptions];
  const entryIndex = options.findIndex(
    (rentEntry) => rentEntry.id === payload.id
  );
  if (entryIndex > -1) {
    options[entryIndex] = {
      ...options[entryIndex],
      ...payload,
    };
  } else {
    options.push(payload);
  }
  return options;
};

// Save Entry in store for Section 24 | section 80C
const getEffectiveAmount = (
  options: DeductionOption[],
  addedAmount: number,
  limit: number
) => {
  const previousAmount = options.reduce(
    (acc: number, option: DeductionOption) => acc + option.amount,
    0
  );
  return Math.min(previousAmount + addedAmount, limit);
};
export const mapSaveEntry = (
  details: DeductionEntry,
  payload: DeductionOption,
  limit: number
): DeductionEntry => {
  const { options: existingOptions } = details;
  const options = [...existingOptions];
  const entryIndex = options.findIndex((entry: any) => entry.id === payload.id);
  let alteredAmount = payload.amount;
  if (entryIndex > -1) {
    alteredAmount = alteredAmount - options[entryIndex].amount;
    options[entryIndex] = {
      ...options[entryIndex],
      ...payload,
    };
  } else {
    options.push(payload);
  }
  return {
    options,
    deductedAmount: getEffectiveAmount(existingOptions, alteredAmount, limit),
  };
};

// Delete Entry in store for Section 24 | section 80C
export const mapDeleteEntry = (
  options: DeductionOption[],
  entryId: string,
  limit: number
): DeductionEntry => {
  const entryIndex = options.findIndex((entry) => entry.id === entryId);
  const addedAmount = options[entryIndex].amount * -1;
  return {
    options: options.filter((entry) => entry.id !== entryId),
    deductedAmount: getEffectiveAmount(options, addedAmount, limit),
  };
};
