import { IncomeReducerType, IncomeOption } from "src/types/income-types";

export const mapSaveIncomeEntry = (
  existingIncome: IncomeReducerType,
  incomeEntry: IncomeOption,
  initialIncomeState: IncomeReducerType
): IncomeReducerType => {
  let modifiedIncomeOptions = [];
  let previousOverallAmount = existingIncome.overallAmount;

  modifiedIncomeOptions = [...existingIncome.options];
  const editableEntryId = existingIncome.editableEntryId;
  if (editableEntryId) {
    const editableEntryIndex = modifiedIncomeOptions.findIndex(
      (income) => income.id === editableEntryId
    );
    previousOverallAmount +=
      incomeEntry.amount - modifiedIncomeOptions[editableEntryIndex].amount;

    modifiedIncomeOptions[editableEntryIndex] = {
      ...modifiedIncomeOptions[editableEntryIndex],
      ...incomeEntry,
    };
  } else {
    modifiedIncomeOptions.push(incomeEntry);
    previousOverallAmount += incomeEntry.amount;
  }
  return {
    ...existingIncome,
    isEditable: initialIncomeState.isEditable,
    editableEntryId: initialIncomeState.editableEntryId,
    options: modifiedIncomeOptions,
    overallAmount: previousOverallAmount,
  };
};
export const mapDeleteIncomeEntry = (
  existingIncome: IncomeReducerType,
  incomeEntryId: string,
  initialIncomeState: IncomeReducerType
): IncomeReducerType => {
  const { isEditable, editableEntryId } = initialIncomeState;
  const removalEntry: IncomeOption | undefined = existingIncome.options.find(
    (income) => income.id === incomeEntryId
  );
  return {
    ...existingIncome,
    isEditable,
    editableEntryId,
    options: existingIncome.options.filter(
      (income) => income.id !== incomeEntryId
    ),
    overallAmount: existingIncome.overallAmount - (removalEntry?.amount ?? 0),
  };
};
