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
  let modifiedCollection = [...rent.collections];
  const editableEntryId = rent.editableEntryId;
  if (rent.editableEntryId) {
    const editableEntryIndex = modifiedCollection.findIndex(
      (rentEntry) => rentEntry.id === editableEntryId
    );
    modifiedCollection[editableEntryIndex] = {
      ...modifiedCollection[editableEntryIndex],
      ...payload,
    };
  } else {
    modifiedCollection.push({ id: uuid4(), ...payload });
  }
  return {
    ...rent,
    isEditable: initialRentState.isEditable,
    editableEntryId: initialRentState.editableEntryId,
    collections: modifiedCollection,
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
