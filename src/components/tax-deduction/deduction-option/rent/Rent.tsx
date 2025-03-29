import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// hooks
import { useDeductionActionEntry, useRentExemption } from "src/hooks";
// selectors
import { selectRentDeduction } from "src/store/deduction/deduction-selectors";
// components
import AddRentEntry from "./AddRentEntry";
import RentEntryForm from "./RentEntryForm";
import { Card, CardWrapper } from "src/components/common";
import { DeleteDeduction } from "src/components/tax-deduction";
// store
import { deleteRentEntry } from "src/store/deduction/deduction-actions";
// constants
import { DEDUCTION_TYPE } from "src/constants/common-constants";
// types
import { DeductionByRent, RentEntry } from "src/types/deduction-types";

const TOTAL_RENT_DURATION = 12;

const Rent = () => {
  const dispatch = useDispatch();
  const { isEditable, entryId, isDelete } = useDeductionActionEntry(
    DEDUCTION_TYPE.RENT
  );
  const { options }: DeductionByRent = useSelector(selectRentDeduction);

  useRentExemption();

  const actionEntry = useMemo(() => {
    const rentEntry = options.find((rentEntry) => rentEntry.id === entryId);
    if (!rentEntry) return undefined;
    const { amount, duration } = rentEntry;
    return {
      ...rentEntry,
      amount: `${amount}`,
      duration: `${duration}`,
    };
  }, [isEditable, isDelete]);

  const totalDuration: number = useMemo(
    () =>
      options.reduce((acc: number, entry) => {
        return acc + (entry.id === entryId ? 0 : entry.duration);
      }, 0),
    [isEditable, isDelete]
  );

  return (
    <>
      {isEditable && (
        <RentEntryForm
          maxDuration={TOTAL_RENT_DURATION - totalDuration}
          entry={actionEntry}
        />
      )}
      {isDelete && entryId && (
        <DeleteDeduction
          title="Rent"
          entryId={entryId}
          onDelete={() => dispatch(deleteRentEntry(entryId))}
        />
      )}
      <AddRentEntry />
      <CardWrapper>
        {options?.map((rentEntry: RentEntry) => {
          const { id = "", amount, duration, isMetroCity } = rentEntry;
          return (
            <Card
              key={id}
              entryId={id}
              type={DEDUCTION_TYPE.RENT}
              content={{
                amountLabel: `Rs. ${amount}`,
                title: `${duration} ${`Month${duration > 1 ? "s" : ""}`}`,
                description: isMetroCity ? "Metro" : "Non-Metro",
              }}
            />
          );
        })}
      </CardWrapper>
    </>
  );
};
export default memo(Rent);
