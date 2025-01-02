import { v4 as uuid4 } from "uuid";
import { DeductionOption, DeductionEntry } from "src/types/deduction-types";
import { getDeductedAmount } from "src/utils/deduction-utils";

export const mapEditDeductionEntry = (
  deductionOption: DeductionOption,
  payload: string
): DeductionOption => ({
  ...deductionOption,
  isEditable: true,
  ...(payload ? { editableEntryId: payload } : {}),
});

export const mapSaveDeductionEntry = (
  deductionOption: DeductionOption,
  payload: DeductionEntry,
  initialState: DeductionOption,
  overallMaxLimit?: number
): DeductionOption => {
  const modifiedOptions = [...deductionOption.options];
  const editableEntryId = deductionOption.editableEntryId;
  if (deductionOption.editableEntryId) {
    const editableEntryIndex = modifiedOptions.findIndex(
      (deductionEntry) => deductionEntry.id === editableEntryId
    );
    modifiedOptions[editableEntryIndex] = {
      ...modifiedOptions[editableEntryIndex],
      ...payload,
    };
  } else {
    modifiedOptions.push({ id: uuid4(), ...payload });
  }

  return {
    ...deductionOption,
    isEditable: initialState.isEditable,
    editableEntryId: initialState.editableEntryId,
    options: modifiedOptions,
    deductedAmount: getDeductedAmount(modifiedOptions, overallMaxLimit),
  };
};
export const mapDeleteDeductionEntry = (
  deductionOption: DeductionOption,
  payload: string,
  initialState: DeductionOption,
  overallMaxLimit?: number
): DeductionOption => {
  const { isEditable, editableEntryId } = initialState;
  const modifiedOptions = [...deductionOption.options].filter(
    (deductionEntry) => deductionEntry.id !== payload
  );
  return {
    ...deductionOption,
    isEditable,
    editableEntryId,
    options: modifiedOptions,
    deductedAmount: getDeductedAmount(modifiedOptions, overallMaxLimit),
  };
};
export const resetDeductionOption = (
  deductionOption: DeductionOption,
  initialState: DeductionOption
): DeductionOption => {
  const { isEditable, editableEntryId } = initialState;
  return {
    ...deductionOption,
    isEditable,
    editableEntryId,
  };
};
