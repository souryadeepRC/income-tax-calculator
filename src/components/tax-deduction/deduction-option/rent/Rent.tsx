import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
// hooks
import useRentExemption from "src/hooks/useRentExemption";
// selectors
import { selectRentDeduction } from "src/store/deduction/deduction-selectors";
// components
import RentCollection from "./RentCollection";
import AddRentEntry from "./AddRentEntry";
import RentEntryForm from "./RentEntryForm";
// types
import { DeductionByRent } from "src/types/deduction-types";

const TOTAL_RENT_DURATION = 12;

const Rent = () => {
  const { collections, isEditable, editableEntryId }: DeductionByRent =
    useSelector(selectRentDeduction);

  useRentExemption();

  const getEditableEntryDetails = useCallback(() => {
    const rentEntry = collections.find(
      (rentEntry) => rentEntry.id === editableEntryId
    );
    if (!rentEntry) return undefined;
    const { amount, duration, isMetroCity } = rentEntry;
    return {
      amount: `${amount}`,
      duration: `${duration}`,
      isMetroCity,
    };
  }, [collections, editableEntryId]);

  const totalDuration: number = useMemo(
    () =>
      collections.reduce((acc, rentEntry) => {
        if (rentEntry.id === editableEntryId) return acc;
        return acc + rentEntry.duration;
      }, 0),
    [collections, editableEntryId]
  );

  return (
    <>
      {isEditable && (
        <RentEntryForm
          durationLeft={TOTAL_RENT_DURATION - totalDuration}
          rentEntry={getEditableEntryDetails()}
        />
      )}
      <AddRentEntry />
      <RentCollection collections={collections} />
    </>
  );
};
export default memo(Rent);
