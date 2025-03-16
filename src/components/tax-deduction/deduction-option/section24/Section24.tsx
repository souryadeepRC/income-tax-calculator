import { memo, useState, useEffect, useCallback } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
import { TUITextField } from "triva-ui";
// components
import { Button, Card, CardWrapper } from "src/components/common";
// actions
import {
  delete80CEntry,
  deleteDeduction,
  editDeduction,
  updateSection24Deduction,
} from "src/store/deduction/deduction-actions";
// selectors
import { selectDeductionSection24 } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/types/store-types";
import { DeductionSection24 } from "src/types/deduction-types";
// constants
import { DEDUCTION_TYPE, NUMERIC_REGEX } from "src/constants/common-constants";
// styles
import classes from "../IncomeTaxDeduction.module.scss";
import { formatNumber } from "src/utils/tax-calculation";
import DeductionHeader from "../../DeductionHeader";
import { useDeductionActionEntry } from "src/hooks";
import Section24EntryForm from "./Section24EntryForm";
import DeleteDeduction from "../../DeleteDeduction";
const Section24 = () => {
  const { isEditable, entryId, isDelete } = useDeductionActionEntry(
    DEDUCTION_TYPE.SECTION24
  );
  // store
  const dispatch: AppDispatch = useDispatch();
  const { options, deductedAmount } = useSelector(selectDeductionSection24);

  const getEditableEntryDetails = useCallback(() => {
    const deductionEntry = options.find(
      (deductionEntry: any) => deductionEntry.id === entryId
    );
    if (!deductionEntry) return undefined;
    const { amount } = deductionEntry;
    return {
      id: entryId,
      amount: `${amount}`,
    };
  }, [options, entryId]);

  return (
    <section className={classes.deduction__container}>
      {isEditable && <Section24EntryForm entry={getEditableEntryDetails()} />}
      {isDelete && entryId && (
        <DeleteDeduction
          entryId={entryId}
          onDelete={() => dispatch(delete80CEntry(entryId))}
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
            content={{
              amountLabel: `Rs. ${formatNumber(option.amount)}`,
              title: "",
            }}
            key={option.id}
            deleteAction={() =>
              dispatch(
                deleteDeduction({
                  type: DEDUCTION_TYPE.SECTION24,
                  entryId: option?.id || "",
                })
              )
            }
            editAction={() =>
              dispatch(
                editDeduction({
                  type: DEDUCTION_TYPE.SECTION24,
                  entryId: option.id,
                })
              )
            }
          />
        ))}
      </CardWrapper>
    </section>
  );
};

export default memo(Section24);
