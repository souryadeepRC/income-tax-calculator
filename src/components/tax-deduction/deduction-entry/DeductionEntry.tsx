import { memo, ReactNode } from "react";
// library
import { IconButton } from "@mui/material";
// icons
import TuneIcon from "@mui/icons-material/Tune";
import DeleteIcon from "@mui/icons-material/Delete";
//styles
import classes from "./DeductionEntry.module.scss";

interface DeductionEntryProps {
  onDelete: () => void;
  onModify: () => void;
  children: ReactNode;
}
const DeductionEntry: React.FC<DeductionEntryProps> = ({
  onDelete,
  onModify,
  children,
}) => (
  <section className={classes.deduction_entry__container}>
    <IconButton
      onClick={onDelete}
      data-testid="deduction-delete-icon"
      className={classes.deduction_entry_action_icon}
    >
      <DeleteIcon />
    </IconButton>
    <section>{children}</section>
    <IconButton
      onClick={onModify}
      data-testid="deduction-edit-icon"
      className={classes.deduction_entry_action_icon}
    >
      <TuneIcon />
    </IconButton>
  </section>
);
export default memo(DeductionEntry);
