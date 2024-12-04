import { memo, useEffect, useState } from "react";
// library
import { Box, TextField } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
// components
import { Button, Modal } from "src/components/common/CommonComponents";
// constants
import { NUMERIC_REGEX } from "src/constants/common-constants";
// styles
import classes from "./IncomeBreakdown.module.scss";
// styles
interface IncomeEditModalProps {
  isEditable: boolean;
  onClose: () => void;
  onEdit: (amount: string) => void;
  label: string;
  amount: string;
}
const IncomeEditModal: React.FC<IncomeEditModalProps> = ({
  isEditable,
  onClose,
  onEdit,
  label,
  amount,
}) => {
  const [editableAmount, setEditableAmount] = useState<string>(amount);
  useEffect(() => {
    setEditableAmount(amount);
  }, [setEditableAmount, amount]);
  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableAmount(event.target.value);
  };
  const onSave = () => {
    onEdit(editableAmount);
    onClose();
  };
  const isAmountError: boolean = !NUMERIC_REGEX.test(editableAmount);
  return (
    <Modal isOpen={isEditable} onClose={onClose}>
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
        <Box display="flex" gap={2} flexWrap="wrap">
          <Button onClick={onSave} startIcon={<SaveIcon fontSize="small" />}>
            Save
          </Button>
          <Button onClick={onClose} startIcon={<CancelIcon fontSize="small" />}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default memo(IncomeEditModal);
