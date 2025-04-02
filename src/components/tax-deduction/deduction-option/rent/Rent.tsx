import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// hooks
import { useDeductionActionEntry, useRentExemption } from "src/hooks";
// components
import AddRentEntry from "./AddRentEntry";
import RentEntryForm from "./RentEntryForm";
import { Card, CardWrapper } from "src/components/common";
import { DeleteDeduction } from "src/components/tax-deduction";
// store
import { deleteRentEntry } from "src/store/deduction/deduction-reducer";
// selectors
import { selectRentOptions } from "src/store/deduction/deduction-selectors";
// constants
import { DEDUCTION_TYPE } from "src/constants/common-constants";
// types
import { RentOption } from "src/types/deduction-types";
import { formatNumber } from "src/utils/tax-calculation";

const TOTAL_RENT_DURATION = 12;

const Rent = () => {
  const dispatch = useDispatch();
  const { isEditable, entryId, isDelete } = useDeductionActionEntry(
    DEDUCTION_TYPE.RENT
  );
  const options: RentOption[] = useSelector(selectRentOptions);

  useRentExemption();

  const actionEntry = useMemo(() => {
    return options.find((rentEntry: RentOption) => rentEntry.id === entryId);
  }, [isEditable, isDelete]);

  const totalDuration: number = useMemo(
    () =>
      options.reduce((acc: number, entry: RentOption) => {
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
        {options?.map((rentEntry: RentOption) => {
          const { id, amount, duration, isMetroCity } = rentEntry;
          return (
            <Card
              key={id}
              entryId={id}
              type={DEDUCTION_TYPE.RENT}
              content={{
                amountLabel: `Rs. ${formatNumber(amount)}`,
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
