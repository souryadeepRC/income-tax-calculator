import { memo } from "react";
// library
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
// icons
import TuneIcon from "@mui/icons-material/Tune";
import DeleteIcon from "@mui/icons-material/Delete";
// actions
import {
  deleteRentEntry,
  editRentEntry,
} from "src/store/deduction/deduction-actions";
// types
import { RentEntry as RentEntryTpe } from "src/types/deduction-types";
//styles
import classes from "./Rent.module.scss";

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
    <section className={classes.rent_entry__container}>
      <div aria-label="rent-amount">
        <span>Rs. {amount}</span>
      </div>
      <div aria-label="rent-duration">
        <span>
          {duration} month{`${duration > 1 ? "s" : ""} `}
        </span>
      </div>
      <div aria-label="rent-city">
        <span>{isMetroCity ? "Metro" : "Non-Metro"}</span>
      </div>
      <div
        aria-label="rent-entry action buttons"
        className={classes.action_btn__container}
      >
        <IconButton onClick={onModify}>
          <TuneIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </section>
  );
};
export default memo(RentEntry);
