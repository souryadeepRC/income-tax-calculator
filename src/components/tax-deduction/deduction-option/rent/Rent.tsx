import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// hooks
import { useDeductionActionEntry, useRentExemption } from "src/hooks";
// selectors
import { selectRentDeduction } from "src/store/deduction/deduction-selectors";
// components
import RentOptions from "./RentOptions";
import AddRentEntry from "./AddRentEntry";
import RentEntryForm from "./RentEntryForm";
import { DeleteDeduction } from "src/components/tax-deduction";
// store
import { deleteRentEntry } from "src/store/deduction/deduction-actions";
// constants
import { DEDUCTION_TYPE } from "src/constants/common-constants";
// types
import { DeductionByRent } from "src/types/deduction-types";

const TOTAL_RENT_DURATION = 12;

const Rent = () => {
  const dispatch = useDispatch();
  const { isEditable, entryId, isDelete } = useDeductionActionEntry(
    DEDUCTION_TYPE.RENT
  );
  const { options }: DeductionByRent = useSelector(selectRentDeduction);

  useRentExemption();

  const getEditableEntryDetails = useCallback(() => {
    const rentEntry = options.find((rentEntry) => rentEntry.id === entryId);
    if (!rentEntry) return undefined;
    const { id, amount, duration, isMetroCity } = rentEntry;
    return {
      id,
      amount: `${amount}`,
      duration: `${duration}`,
      isMetroCity,
    };
  }, [options, entryId]);

  const totalDuration: number = useMemo(
    () =>
      options.reduce((acc, rentEntry) => {
        if (rentEntry.id === entryId) return acc;
        return acc + rentEntry.duration;
      }, 0),
    [options, entryId]
  );

  return (
    <>
      {isEditable && (
        <RentEntryForm
          durationLeft={TOTAL_RENT_DURATION - totalDuration}
          rentEntry={getEditableEntryDetails()}
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
      <RentOptions options={options} />
    </>
  );
};
export default memo(Rent);
