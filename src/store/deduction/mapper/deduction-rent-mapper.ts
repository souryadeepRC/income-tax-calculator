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

export const mapSaveEntry = (
  details: DeductionEntry,
  payload: DeductionOption,
  limit: number
): DeductionEntry => {
  const { deductedAmount, options } = details;
  let updatedAmount: number = deductedAmount + payload.amount;
  const entryIndex = options.findIndex((entry: any) => entry.id === payload.id);
  if (entryIndex > -1) {
    options[entryIndex] = {
      ...options[entryIndex],
      ...payload,
    };
    updatedAmount += payload.amount - options[entryIndex].amount;
  } else {
    options.push(payload);
  }
  return { options, deductedAmount: Math.min(updatedAmount, limit) };
};

// Delete Entry in store for Section 24 | section 80C
export const mapDeleteEntry = (
  options: DeductionOption[],
  entryId: string,
  limit: number
): DeductionEntry => {
  const entryIndex = options.findIndex((entry) => entry.id === entryId);
  return {
    options: options.filter((entry) => entry.id !== entryId),
    deductedAmount: Math.min(options[entryIndex].amount, limit),
  };
};
