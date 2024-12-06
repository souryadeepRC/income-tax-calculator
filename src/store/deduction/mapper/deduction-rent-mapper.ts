import { v4 as uuid4 } from "uuid";
import { DeductionByRent, RentEntry } from "src/types/deduction-types";

export const mapEditRentEntry = (rent: DeductionByRent, payload: string) => {
  return {
    ...rent,
    isEditable: true,
    ...(payload ? { editableEntryId: payload } : {}),
  };
};

export const mapSaveRentEntry = (
  rent: DeductionByRent,
  payload: RentEntry,
  initialRentState: DeductionByRent
) => {
  const { isEditable, editableEntryId } = initialRentState;
  return {
    ...rent,
    isEditable,
    editableEntryId,
    collections: [...rent.collections, { id: uuid4(), ...payload }],
  };
};
export const mapDeleteRentEntry = (
  rent: DeductionByRent,
  payload: string,
  initialRentState: DeductionByRent
) => {
  const { isEditable, editableEntryId } = initialRentState;
  return {
    ...rent,
    isEditable,
    editableEntryId,
    collections: [...rent.collections].filter(
      (rentEntry) => rentEntry.id !== payload
    ),
  };
};
