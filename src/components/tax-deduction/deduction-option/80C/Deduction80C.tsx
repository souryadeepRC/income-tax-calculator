import { memo, useCallback } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import DeductionHeader from "src/components/tax-deduction/DeductionHeader";
// actions
import {
  delete80CEntry,
  deleteDeduction,
  edit80CEntry,
  editDeduction,
  resetDeductionAction,
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
import {
  DEDUCTION_80C_OPTIONS,
  DEDUCTION_TYPE,
} from "src/constants/common-constants";
// utils
import { formatNumber } from "src/utils/tax-calculation";
import { Card, CardWrapper, Modal } from "src/components/common";
import { useDeductionActionEntry } from "src/hooks";
import DeleteDeduction from "../../DeleteDeduction";
import Section80CEntryForm from "../../deduction-entry/Section80CEntryForm";

const Deduction80C = () => {
  const { isEditable, entryId, isDelete } = useDeductionActionEntry(
    DEDUCTION_TYPE.SECTION80C
  );
  // store
  const dispatch: AppDispatch = useDispatch();
  const { options, deductedAmount }: DeductionOption =
    useSelector(selectDeduction80C);

  const getEditableEntryDetails = useCallback(() => {
    const deductionEntry = options.find(
      (deductionEntry) => deductionEntry.id === entryId
    );
    if (!deductionEntry) return undefined;
    const { amount, category } = deductionEntry;
    return {
      category,
      amount: `${amount}`,
    };
  }, [options, entryId]);
  const getDeductionOptions = (): DeductionEntryOption[] =>
    Object.keys(DEDUCTION_80C_OPTIONS).reduce(
      (acc: DeductionEntryOption[], category: string) => {
        const isAdded =
          options.findIndex(
            (option) => entryId !== option.id && option.category === category
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
    dispatch(resetDeductionAction());
  };
  const onAddDeduction = () => {
    dispatch(editDeduction({ type: DEDUCTION_TYPE.SECTION80C }));
  };
  return (
    <main>
      {isEditable && (
        <Modal onClose={onReset}>
          <Section80CEntryForm
            entry={getEditableEntryDetails()}
            options={getDeductionOptions()}
          />
        </Modal>
      )}
      {isDelete && entryId && (
        <DeleteDeduction
          entryId={entryId}
          onDelete={() => dispatch(delete80CEntry(entryId))}
        />
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
              dispatch(
                deleteDeduction({
                  type: DEDUCTION_TYPE.SECTION80C,
                  entryId: deductionOption?.id || "",
                })
              )
            }
            editAction={() =>
              dispatch(
                editDeduction({
                  type: DEDUCTION_TYPE.SECTION80C,
                  entryId: deductionOption.id,
                })
              )
            }
          />
        ))}
      </CardWrapper>
    </main>
  );
};
export default memo(Deduction80C);
