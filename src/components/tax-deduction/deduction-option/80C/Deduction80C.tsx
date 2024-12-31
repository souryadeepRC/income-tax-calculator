import { memo, useCallback } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import DeductionEntry from "src/components/tax-deduction/deduction-entry/DeductionEntry";
import DeductionEntryForm from "src/components/tax-deduction/deduction-entry/DeductionEntryForm";
import AddDeductionEntry from "src/components/tax-deduction/deduction-entry/AddDeductionEntry";
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
import { AppDispatch } from "src/store/reducer-types";
import {
  DeductionEntry as DeductionEntryType,
  DeductionOption,
} from "src/types/deduction-types";
// constants
import { DEDUCTION_80C_OPTIONS } from "src/constants/common-constants";
// utils
import { formatNumber } from "src/utils/tax-calculation";
import { Modal } from "src/components/common/CommonComponents";

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
      (deductionEntry) => deductionEntry.id === editableEntryId,
    );
    if (!deductionEntry) return undefined;
    const { amount, category } = deductionEntry;
    return {
      category,
      amount: `${amount}`,
    };
  }, [options, editableEntryId]);
  const getDeductionOptions = () => {
    return Object.keys(DEDUCTION_80C_OPTIONS).reduce(
      (acc: any, category: any) => {
        const isAdded =
          options.findIndex(
            (option) =>
              editableEntryId !== option.id && option.category === category,
          ) > -1;

        return [
          ...acc,
          { category, label: DEDUCTION_80C_OPTIONS[category], isAdded },
        ];
      },
      [],
    );
  };
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
        <Modal isOpen={true} onClose={onReset}>
          <DeductionEntryForm
            entry={getEditableEntryDetails()}
            options={getDeductionOptions()}
            onSave={onSave}
            onReset={onReset}
          />
        </Modal>
      )}
      <AddDeductionEntry
        deductedAmount={deductedAmount}
        deductionSection="Section 80C"
        onAddDeduction={onAddDeduction}
      />

      <section>
        {options.map((deductionOption) => {
          return (
            <DeductionEntry
              key={deductionOption.category}
              onDelete={() =>
                dispatch(delete80CEntry(deductionOption?.id || ""))
              }
              onModify={() => dispatch(edit80CEntry(deductionOption.id))}
            >
              <>
                <span>{DEDUCTION_80C_OPTIONS[deductionOption.category]}</span>
                <span>Rs. {formatNumber(deductionOption.amount)}</span>
              </>
            </DeductionEntry>
          );
        })}
      </section>
    </main>
  );
};
export default memo(Deduction80C);
