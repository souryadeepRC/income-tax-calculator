import { IncomeReducerType, IncomeOption } from "src/types/income-types";

export const mapSaveIncomeEntry = (
  income: IncomeReducerType,
  entry: IncomeOption
): IncomeReducerType => {
  let previousOverallAmount = income.overallAmount;

  let modifiedIncomeOptions = [...income.options];
  const editableEntryIndex = modifiedIncomeOptions.findIndex(
    (option) => option.id === entry.id
  );
  if (editableEntryIndex > -1) {
    previousOverallAmount +=
      entry.amount - modifiedIncomeOptions[editableEntryIndex].amount;

    modifiedIncomeOptions[editableEntryIndex] = {
      ...modifiedIncomeOptions[editableEntryIndex],
      ...entry,
    };
  } else {
    modifiedIncomeOptions.push(entry);
    previousOverallAmount += entry.amount;
  }
  return {
    ...income,
    options: modifiedIncomeOptions,
    overallAmount: previousOverallAmount,
  };
};
export const mapDeleteIncomeEntry = (
  income: IncomeReducerType,
  entryId: string
): IncomeReducerType => {
  const removalEntry: IncomeOption | undefined = income.options.find(
    (income) => income.id === entryId
  );
  return {
    ...income,
    options: income.options.filter((income) => income.id !== entryId),
    overallAmount: income.overallAmount - (removalEntry?.amount ?? 0),
  };
};
