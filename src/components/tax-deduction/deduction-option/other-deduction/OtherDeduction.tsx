import { useMemo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import OtherEntryForm from "./OtherEntryForm";
import { DeductionHeader, DeleteDeduction } from "src/components/tax-deduction";
import { Card, CardWrapper } from "src/components/common";
// hooks
import { useDeductionActionEntry } from "src/hooks";
// actions
import {
  deleteOtherEntry,
  editDeduction,
} from "src/store/deduction/deduction-reducer";
// selectors
import { selectOtherDeduction } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/types/store-types";
// constants
import { DEDUCTION_TYPE } from "src/constants/common-constants";
// styles
import { formatNumber } from "src/utils/tax-calculation";

const OtherDeduction = () => {
  const { isEditable, entryId, isDelete } = useDeductionActionEntry(
    DEDUCTION_TYPE.OTHERS
  );
  // store
  const dispatch: AppDispatch = useDispatch();
  const { options, deductedAmount } = useSelector(selectOtherDeduction);

  const actionEntry = useMemo(() => {
    return options.find((entry: any) => entry.id === entryId);
  }, [isEditable, isDelete]);

  return (
    <>
      {isEditable && <OtherEntryForm entry={actionEntry} />}
      {isDelete && entryId && (
        <DeleteDeduction
          title="Other deduction"
          entryId={entryId}
          onDelete={() => dispatch(deleteOtherEntry(entryId))}
        />
      )}
      <DeductionHeader
        title="Other Deductions"
        amount={deductedAmount}
        addAction={() =>
          dispatch(editDeduction({ type: DEDUCTION_TYPE.OTHERS }))
        }
        actionText="Add Entry"
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
            type={DEDUCTION_TYPE.OTHERS}
          />
        ))}
      </CardWrapper>
    </>
  );
};

export default OtherDeduction;
