import { memo } from "react";
// library
import { useDispatch } from "react-redux";
// components
import DeductionEntry from "src/components/tax-deduction/deduction-entry/DeductionEntry";
// actions
import {
  deleteRentEntry,
  editRentEntry,
} from "src/store/deduction/deduction-actions";
// types
import { RentEntry as RentEntryTpe } from "src/types/deduction-types";

interface RentEntryProps {
  details: RentEntryTpe;
}
const RentEntry: React.FC<RentEntryProps> = ({ details }) => {
  const { id = "", amount, duration, isMetroCity } = details;
  const dispatch = useDispatch();
  const onModify = () => {
    dispatch(editRentEntry(id));
  };
  const onDelete = () => {
    dispatch(deleteRentEntry(id));
  };
  return (
    <DeductionEntry onDelete={onDelete} onModify={onModify}>
      <>
        <div aria-label="rent-amount">
          <span>Rs. {amount}</span>
        </div>
        <div aria-label="rent-duration">
          <span>
            {duration}&nbsp;{`Month${duration > 1 ? "s" : ""}`}
          </span>
        </div>
        <div aria-label="rent-city">
          <span>{isMetroCity ? "Metro" : "Non-Metro"}</span>
        </div>
      </>
    </DeductionEntry>
  );
};
export default memo(RentEntry);
