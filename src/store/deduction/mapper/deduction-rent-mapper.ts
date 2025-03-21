import { SECTION_24_MAX_LIMIT } from "src/constants/common-constants";
import { RentEntry, Section24Entry } from "src/types/deduction-types";

export const mapSaveRentEntry = (
  options: RentEntry[],
  payload: RentEntry
): RentEntry[] => {
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

export const mapSection24Entry = (details: any, payload: any) => {
  const { deductedAmount, options } = details;
  const maxLimit = 200000;
  let updatedAmount = deductedAmount + payload.amount;
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
  const effectiveAmount = Math.min(updatedAmount, SECTION_24_MAX_LIMIT);
  return { options, deductedAmount: effectiveAmount };
};
export const mapSection24DeleteEntry = (
  options: Section24Entry[],
  payload: any
) => {
  const entryIndex = options.findIndex((entry) => entry.id === payload.id);
  const effectiveAmount = Math.min(
    options[entryIndex].amount,
    SECTION_24_MAX_LIMIT
  );
  return {
    options: options.filter((entry) => entry.id !== payload),
    deductedAmount: effectiveAmount,
  };
};
