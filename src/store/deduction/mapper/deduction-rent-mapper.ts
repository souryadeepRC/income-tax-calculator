import { v4 as uuid4 } from "uuid";
import { DeductionByRent, RentEntry } from "src/types/deduction-types";

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
