import { memo, useMemo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import { Card, CardWrapper } from "src/components/common";
import Section80CEntryForm from "src/components/tax-deduction/deduction-entry/Section80CEntryForm";
import { DeleteDeduction, DeductionHeader } from "src/components/tax-deduction";
// hooks
import { useDeductionActionEntry } from "src/hooks";
// actions
import {
  delete80CEntry,
  editDeduction,
} from "src/store/deduction/deduction-actions";
// selectors
import { selectDeduction80C } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/types/store-types";
import { DeductionOption } from "src/types/deduction-types";
// constants
import {
  DEDUCTION_80C_OPTIONS,
  DEDUCTION_TYPE,
} from "src/constants/common-constants";
// utils
import { formatNumber } from "src/utils/tax-calculation";

const Deduction80C = () => {
  const { isEditable, entryId, isDelete } = useDeductionActionEntry(
    DEDUCTION_TYPE.SECTION80C
  );
  // store
  const dispatch: AppDispatch = useDispatch();
  const { options, deductedAmount }: DeductionOption =
    useSelector(selectDeduction80C);

  const actionEntry = useMemo(() => {
    const entry = options.find(
      (deductionEntry) => deductionEntry.id === entryId
    );
    if (!entry) return undefined;
    return {
      ...entry,
      amount: `${entry.amount}`,
    };
  }, [isEditable, isDelete]);

  const entryOptions = useMemo(() => {
    const optionsMap = new Map(
      options.map((option) => [option.category, true])
    );
    return Object.keys(DEDUCTION_80C_OPTIONS).map((category) => {
      return {
        category,
        label: DEDUCTION_80C_OPTIONS[category],
        isAdded: optionsMap.has(category),
      };
    });
  }, [isEditable, isDelete]);

  return (
    <main>
      {isEditable && (
        <Section80CEntryForm entry={actionEntry} options={entryOptions} />
      )}
      {isDelete && entryId && (
        <DeleteDeduction
          title="Section 80C"
          entryId={entryId}
          onDelete={() => dispatch(delete80CEntry(entryId))}
        />
      )}
      <DeductionHeader
        title="Section 80C"
        amount={deductedAmount}
        addAction={() => {
          dispatch(editDeduction({ type: DEDUCTION_TYPE.SECTION80C }));
        }}
      />

      <CardWrapper>
        {options.map((option) => (
          <Card
            key={option.id}
            content={{
              amountLabel: `Rs. ${formatNumber(option.amount)}`,
              title: DEDUCTION_80C_OPTIONS[option.category],
            }}
            entryId={option.id}
            type={DEDUCTION_TYPE.SECTION80C}
          />
        ))}
      </CardWrapper>
    </main>
  );
};
export default memo(Deduction80C);
