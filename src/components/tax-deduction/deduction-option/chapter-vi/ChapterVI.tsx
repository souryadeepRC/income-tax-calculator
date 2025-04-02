import { useMemo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import ChapterVIEntryForm from "./ChapterVIEntryForm";
import { Card, CardWrapper } from "src/components/common";
import { DeleteDeduction, DeductionHeader } from "src/components/tax-deduction";
// hooks
import { useDeductionActionEntry } from "src/hooks";
// actions
import {
  deleteChapterVIEntry,
  editDeduction,
} from "src/store/deduction/deduction-reducer";
// selectors
import { selectChapter6Deduction } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/types/store-types";
import {
  DeductionEntry,
  DeductionEntryOption,
  DeductionOption,
} from "src/types/deduction-types";
// constants
import {
  DEDUCTION_CHAPTER_VI_OPTIONS,
  DEDUCTION_TYPE,
} from "src/constants/common-constants";
// utils
import { formatNumber } from "src/utils/tax-calculation";

const ChapterVI: React.FC = () => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const { isEditable, entryId, isDelete } = useDeductionActionEntry(
    DEDUCTION_TYPE.CHAPTER_VIA
  );
  const { options, deductedAmount }: DeductionEntry = useSelector(
    selectChapter6Deduction
  );

  const actionEntry = useMemo(() => {
    return options.find(
      (deductionEntry: DeductionOption) => deductionEntry.id === entryId
    );
  }, [isEditable, isDelete]);

  const entryOptions = useMemo(
    () =>
      Object.keys(DEDUCTION_CHAPTER_VI_OPTIONS).reduce(
        (acc: DeductionEntryOption[], category: string) => {
          const isAdded =
            options.findIndex(
              (option: DeductionOption) =>
                entryId !== option.id && option.category === category
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
      ),
    [isEditable, isDelete]
  );

  return (
    <main>
      {isEditable && (
        <ChapterVIEntryForm entry={actionEntry} options={entryOptions} />
      )}
      {isDelete && entryId && (
        <DeleteDeduction
          title="Chapter VI-A"
          entryId={entryId}
          onDelete={() => dispatch(deleteChapterVIEntry(entryId))}
        />
      )}
      <DeductionHeader
        title="Chapter VI-A"
        amount={deductedAmount}
        addAction={() => {
          dispatch(editDeduction({ type: DEDUCTION_TYPE.CHAPTER_VIA }));
        }}
      />

      <CardWrapper>
        {options.map((option: DeductionOption) => (
          <Card
            key={option.category}
            content={{
              title: DEDUCTION_CHAPTER_VI_OPTIONS[option.category].label,
              amountLabel: `Rs. ${formatNumber(option.amount)}`,
              description: DEDUCTION_CHAPTER_VI_OPTIONS[option.category]
                .maxLimit
                ? `Max Limit: ${formatNumber(DEDUCTION_CHAPTER_VI_OPTIONS[option.category]?.maxLimit || 0)}`
                : "",
            }}
            entryId={option.id}
            type={DEDUCTION_TYPE.CHAPTER_VIA}
          />
        ))}
      </CardWrapper>
    </main>
  );
};
export default ChapterVI;
