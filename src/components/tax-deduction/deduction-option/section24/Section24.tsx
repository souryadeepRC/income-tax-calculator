import { memo, useMemo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import Section24EntryForm from "./Section24EntryForm";
import { DeductionHeader, DeleteDeduction } from "src/components/tax-deduction";
import { Card, CardWrapper } from "src/components/common";
// hooks
import { useDeductionActionEntry } from "src/hooks";
// actions
import {
  delete80CEntry,
  deleteDeduction,
  deleteSection24Entry,
  editDeduction,
} from "src/store/deduction/deduction-actions";
// selectors
import { selectDeductionSection24 } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/types/store-types";
// constants
import { DEDUCTION_TYPE } from "src/constants/common-constants";
// styles
import { formatNumber } from "src/utils/tax-calculation";

const Section24 = () => {
  const { isEditable, entryId, isDelete } = useDeductionActionEntry(
    DEDUCTION_TYPE.SECTION24
  );
  // store
  const dispatch: AppDispatch = useDispatch();
  const { options, deductedAmount } = useSelector(selectDeductionSection24);

  const actionEntry = useMemo(() => {
    return options.find((entry: any) => entry.id === entryId);
  }, [isEditable, isDelete]);

  return (
    <>
      {isEditable && <Section24EntryForm entry={actionEntry} />}
      {isDelete && entryId && (
        <DeleteDeduction
          title="Section 24"
          entryId={entryId}
          onDelete={() => dispatch(deleteSection24Entry(entryId))}
        />
      )}
      <DeductionHeader
        title="Section 24"
        amount={deductedAmount}
        addAction={() =>
          dispatch(editDeduction({ type: DEDUCTION_TYPE.SECTION24 }))
        }
      />

      <CardWrapper>
        {options.map((option: any) => (
          <Card
            key={option.id}
            content={{
              amountLabel: `Rs. ${formatNumber(option.amount)}`,
              title: "",
            }}
            entryId={option.id}
            type={DEDUCTION_TYPE.SECTION24}
          />
        ))}
      </CardWrapper>
    </>
  );
};

export default memo(Section24);
