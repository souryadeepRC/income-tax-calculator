import { memo, useCallback } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import { Card, CardWrapper, Modal } from "src/components/common";
import DeductionHeader from "src/components/tax-deduction/DeductionHeader";
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
import Section80CEntryForm from "../../deduction-entry/Section80CEntryForm";

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
          <Section80CEntryForm
            entry={getEditableEntryDetails()}
            options={getDeductionOptions()}
          />
        </Modal>
      )}

      <DeductionHeader
        title="Chapter VIA"
        amount={deductedAmount}
        addAction={onAddDeduction}
      />

      <CardWrapper>
        {options.map((deductionOption) => (
          <Card
            key={deductionOption.category}
            deleteAction={() =>
              dispatch(deleteChapterVIEntry(deductionOption?.id || ""))
            }
            editAction={() => dispatch(editChapterVIEntry(deductionOption.id))}
            content={{
              title:
                DEDUCTION_CHAPTER_VI_OPTIONS[deductionOption.category].label,
              amountLabel: `Rs. ${formatNumber(deductionOption.amount)}`,
              description: deductionOption.maxLimit
                ? `Max Limit: ${deductionOption.maxLimit}`
                : "",
            }}
          />
        ))}
      </CardWrapper>
    </main>
  );
};
export default memo(ChapterVI);
