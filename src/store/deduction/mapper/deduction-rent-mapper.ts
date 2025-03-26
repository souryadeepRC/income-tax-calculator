import { SECTION_24_MAX_LIMIT } from "src/constants/common-constants";
import {
  DeductionEntry,
  RentEntry,
  Section24Entry,
} from "src/types/deduction-types";

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

// Save Entry in store for Section 24 | section 80C
type EntryType = {
  options: (Section24Entry | DeductionEntry)[];
  deductedAmount: number;
};
type saveEntryPayload = Section24Entry | DeductionEntry;

export const mapSaveEntry = (
  details: EntryType,
  payload: saveEntryPayload,
  limit: number
): EntryType => {
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
type DeleteEntryOptions = (Section24Entry | DeductionEntry)[];

export const mapDeleteEntry = (
  options: DeleteEntryOptions,
  entryId: string,
  limit: number
): EntryType => {
  const entryIndex = options.findIndex((entry) => entry.id === entryId);
  return {
    options: options.filter((entry) => entry.id !== entryId),
    deductedAmount: Math.min(options[entryIndex].amount, limit),
  };
};
