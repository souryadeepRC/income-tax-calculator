import { memo, useEffect, useState } from "react";
// library
import { TUITextField } from "triva-ui";
import { useDispatch, useSelector } from "react-redux";
// components
import { Modal, Button } from "src/components/common/CommonComponents";
// store
import { saveIncomeDetails } from "src/store/income/income-actions";
import { selectEditableIncomeOption } from "src/store/income/income-selectors";
// constants
import { NUMERIC_REGEX } from "src/constants/common-constants";
// styles
import classes from "./IncomeEditModal.module.scss";
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
  const isAmountError = !NUMERIC_REGEX.test(editableAmount);
  return (
    <Modal onClose={onCancel}>
      <div className={classes.income_edit__container}>
        <div className={classes.edit__header}>
          <strong>Previous Amount</strong>
          <label>
            {label}: Rs. {amount}
          </label>
        </div>
        <TUITextField
          fullWidth
          label="Amount"
          id="edit-income-amount"
          inputProps={{ "data-testid": "edit-income-amount-input" }}
          value={editableAmount}
          onChange={onAmountChange}
          errorMessage={
            isAmountError
              ? "Enter a valid amount more than 0 (e.g. 100.50 or 100)"
              : ""
          }
        />
        <div className={classes.action_btn__container}>
          <Button
            variant="text"
            data-testid="edit-income-cancel"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            border="round"
            data-testid="edit-income-save"
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default memo(IncomeEditModal);
