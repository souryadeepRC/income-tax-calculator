import { memo, useCallback } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import { Modal } from "src/components/common";
import DeductionEntry from "src/components/tax-deduction/deduction-entry/DeductionEntry";
import DeductionEntryForm from "src/components/tax-deduction/deduction-entry/DeductionEntryForm";
import AddDeductionEntry from "src/components/tax-deduction/deduction-entry/AddDeductionEntry";
// actions
import {
  deleteChapterVIEntry,
  editChapterVIEntry,
  resetEditChapterVIEntry,
  saveChapterVIEntry,
} from "src/store/deduction/deduction-actions";
// selectors
import { selectDeductionChapter6 } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/types/store-types";
import {
  DeductionEntryOption,
  DeductionEntry as DeductionEntryType,
  DeductionOption,
} from "src/types/deduction-types";
// constants
import { DEDUCTION_CHAPTER_VI_OPTIONS } from "src/constants/common-constants";
// utils
import { formatNumber } from "src/utils/tax-calculation";

const ChapterVI: React.FC = () => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const {
    options,
    deductedAmount,
    isEditable,
    editableEntryId,
  }: DeductionOption = useSelector(selectDeductionChapter6);

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
  const getDeductionOptions = () =>
    Object.keys(DEDUCTION_CHAPTER_VI_OPTIONS).reduce(
      (acc: DeductionEntryOption[], category: string) => {
        const isAdded =
          options.findIndex(
            (option) =>
              editableEntryId !== option.id && option.category === category
          ) > -1;

        return [
          ...acc,
          {
            category,
            label: DEDUCTION_CHAPTER_VI_OPTIONS[category].label,
            maxLimit: DEDUCTION_CHAPTER_VI_OPTIONS[category].maxLimit,
            isAdded,
          },
        ];
      },
      []
    );
  const onSave = (entryDetails: DeductionEntryType) => {
    dispatch(saveChapterVIEntry(entryDetails));
  };
  const onReset = () => {
    dispatch(resetEditChapterVIEntry());
  };
  const onAddDeduction = () => {
    dispatch(editChapterVIEntry());
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
      <AddDeductionEntry
        deductedAmount={deductedAmount}
        deductionSection="Chapter VIA"
        onAddDeduction={onAddDeduction}
      />

      <section>
        {options.map((deductionOption) => (
          <DeductionEntry
            key={deductionOption.category}
            onDelete={() =>
              dispatch(deleteChapterVIEntry(deductionOption?.id || ""))
            }
            onModify={() => dispatch(editChapterVIEntry(deductionOption.id))}
          >
            <>
              <span>
                {DEDUCTION_CHAPTER_VI_OPTIONS[deductionOption.category].label}
              </span>
              <span>Rs. {formatNumber(deductionOption.amount)}</span>
            </>
          </DeductionEntry>
        ))}
      </section>
    </main>
  );
};
export default memo(ChapterVI);
