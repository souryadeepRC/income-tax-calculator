import { memo, useCallback } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import DeductionHeader from "src/components/tax-deduction/DeductionHeader";
import DeductionEntryForm from "src/components/tax-deduction/deduction-entry/DeductionEntryForm";
// actions
import {
  delete80CEntry,
  edit80CEntry,
  resetEdit80CEntry,
  save80CEntry,
} from "src/store/deduction/deduction-actions";
// selectors
import { selectDeduction80C } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/types/store-types";
import {
  DeductionEntryOption,
  DeductionEntry as DeductionEntryType,
  DeductionOption,
} from "src/types/deduction-types";
// constants
import { DEDUCTION_80C_OPTIONS } from "src/constants/common-constants";
// utils
import { formatNumber } from "src/utils/tax-calculation";
import { Card, CardWrapper, Modal } from "src/components/common";

const Deduction80C = () => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const {
    options,
    deductedAmount,
    isEditable,
    editableEntryId,
  }: DeductionOption = useSelector(selectDeduction80C);

  const getEditableEntryDetails = useCallback(() => {
    const deductionEntry = options.find(
      (deductionEntry) => deductionEntry.id === editableEntryId
    );
    if (!deductionEntry) return undefined;
    const { amount, category } = deductionEntry;
    return {
      category,
      amount: `${amount}`,
    };
  }, [options, editableEntryId]);
  const getDeductionOptions = (): DeductionEntryOption[] =>
    Object.keys(DEDUCTION_80C_OPTIONS).reduce(
      (acc: DeductionEntryOption[], category: string) => {
        const isAdded =
          options.findIndex(
            (option) =>
              editableEntryId !== option.id && option.category === category
          ) > -1;

        return [
          ...acc,
          { category, label: DEDUCTION_80C_OPTIONS[category], isAdded },
        ];
      },
      []
    );
  const onSave = (entryDetails: DeductionEntryType) => {
    dispatch(save80CEntry(entryDetails));
  };
  const onReset = () => {
    dispatch(resetEdit80CEntry());
  };
  const onAddDeduction = () => {
    dispatch(edit80CEntry());
  };
  return (
    <main>
      {isEditable && (
        <Modal onClose={onReset}>
          <DeductionEntryForm
            entry={getEditableEntryDetails()}
            options={getDeductionOptions()}
            onSave={onSave}
            onReset={onReset}
          />
        </Modal>
      )}
      <DeductionHeader
        title="Section 80C"
        amount={deductedAmount}
        addAction={onAddDeduction}
      />

      <CardWrapper>
        {options.map((deductionOption) => (
          <Card
            content={{
              amountLabel: `Rs. ${formatNumber(deductionOption.amount)}`,
              title: DEDUCTION_80C_OPTIONS[deductionOption.category],
              description: deductionOption.maxLimit
                ? `Max Limit : ${deductionOption.maxLimit}`
                : undefined,
            }}
            key={deductionOption.category}
            deleteAction={() =>
              dispatch(delete80CEntry(deductionOption?.id || ""))
            }
            editAction={() => dispatch(edit80CEntry(deductionOption.id))}
          />
        ))}
      </CardWrapper>
    </main>
  );
};
export default memo(Deduction80C);
