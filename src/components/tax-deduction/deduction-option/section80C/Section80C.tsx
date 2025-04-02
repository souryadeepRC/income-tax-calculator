import { useMemo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import { Card, CardWrapper } from "src/components/common";
import Section80CEntryForm from "./Section80CEntryForm";
import { DeleteDeduction, DeductionHeader } from "src/components/tax-deduction";
// hooks
import { useDeductionActionEntry } from "src/hooks";
// store
import {
  deleteSection80CEntry,
  editDeduction,
} from "src/store/deduction/deduction-reducer";
import { selectSection80CDeduction } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/types/store-types";
import { DeductionEntry, DeductionOption } from "src/types/deduction-types";
// constants
import {
  DEDUCTION_80C_OPTIONS,
  DEDUCTION_TYPE,
} from "src/constants/common-constants";
// utils
import { formatNumber } from "src/utils/tax-calculation";

const Section80C = () => {
  const { isEditable, entryId, isDelete } = useDeductionActionEntry(
    DEDUCTION_TYPE.SECTION_80C
  );
  // store
  const dispatch: AppDispatch = useDispatch();

  const { options, deductedAmount }: DeductionEntry = useSelector(
    selectSection80CDeduction
  );

  const actionEntry: DeductionOption | undefined = useMemo(() => {
    return options.find(
      (deductionEntry: DeductionOption) => deductionEntry.id === entryId
    );
  }, [isEditable, isDelete]);

  const entryOptions = useMemo(() => {
    const optionsMap = new Map(
      options.map((option: DeductionOption) => [option.category, true])
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
          onDelete={() => dispatch(deleteSection80CEntry(entryId))}
        />
      )}
      <DeductionHeader
        title="Section 80C"
        amount={deductedAmount}
        addAction={() => {
          dispatch(editDeduction({ type: DEDUCTION_TYPE.SECTION_80C }));
        }}
        actionText="Add Entry"
        note="you can avail maximum Rc. 1,50,000 of exemption"
      />

      <CardWrapper>
        {options.map((option: DeductionOption) => (
          <Card
            key={option.id}
            content={{
              amountLabel: `Rs. ${formatNumber(option.amount)}`,
              title: DEDUCTION_80C_OPTIONS[option.category],
            }}
            entryId={option.id}
            type={DEDUCTION_TYPE.SECTION_80C}
          />
        ))}
      </CardWrapper>
    </main>
  );
};
export default Section80C;
