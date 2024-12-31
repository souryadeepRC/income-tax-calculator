import { memo, useEffect, useState } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
import { Button, Box } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
// components
import { TextField } from "src/components/common/CommonComponents";
// store
import { saveIncomeDetails } from "src/store/income/income-actions";
import { selectEditableIncomeOption } from "src/store/income/income-selectors";
// constants
import { NUMERIC_REGEX } from "src/constants/common-constants";
// styles
import classes from "./IncomeBreakdown.module.scss";
// styles
interface IncomeEditModalProps {
  onCancel: () => void;
}
const IncomeEditModal: React.FC<IncomeEditModalProps> = ({ onCancel }) => {
  const dispatch = useDispatch();
  const { amount, label, category } = useSelector(selectEditableIncomeOption);
  const [editableAmount, setEditableAmount] = useState<string>("");

  useEffect(() => {
    setEditableAmount(`${amount}`);
  }, [setEditableAmount, amount]);

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableAmount(event.target.value);
  };
  const onSave = () => {
    if (!NUMERIC_REGEX.test(editableAmount)) return;
    dispatch(saveIncomeDetails({ label, category, amount: +editableAmount }));
  };
  const isAmountError: boolean = !NUMERIC_REGEX.test(editableAmount);
  return (
    <Box className={classes.income_edit__container}>
      <div className={classes.edit__header}>
        <strong>Edit {label} Details</strong>
        <label>Previous Amount: Rs. {amount} </label>
      </div>
      <TextField
        label="Amount"
        id="edit-income-amount"
        variant="standard"
        inputProps={{ "data-testid": "edit-income-amount-input" }}
        value={editableAmount}
        onChange={onAmountChange}
        error={isAmountError}
        helperText={
          isAmountError &&
          "Enter a valid amount more than 0 (e.g. 100.50 or 100)"
        }
      />
      <Box
        className={classes.action_btn__container}
        display="flex"
        gap={2}
        flexWrap="wrap"
      >
        <Button
          variant="text"
          data-testid="edit-income-cancel"
          className={classes.action_btn__clear}
          onClick={onCancel}
          startIcon={<CancelIcon fontSize="small" />}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          data-testid="edit-income-save"
          className={classes.action_btn__submit}
          onClick={onSave}
          startIcon={<SaveIcon fontSize="small" />}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
export default memo(IncomeEditModal);
