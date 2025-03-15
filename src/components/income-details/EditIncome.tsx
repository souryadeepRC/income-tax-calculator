import { useEffect, useState } from "react";
// library
import { TUITextField } from "triva-ui";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
// components
import {
  ErrorMessage,
  Button,
  InfiniteProgressBar,
} from "src/components/common/CommonComponents";
// service
import dbService from "src/service/Database";
// store
import {
  resetEditIncomeEntry,
  saveIncomeDetails,
} from "src/store/income/income-actions";
import { selectEditableIncomeOption } from "src/store/income/income-selectors";
// constants
import { NUMERIC_REGEX } from "src/constants/common-constants";
// styles
import classes from "./IncomeEditModal.module.scss";

const EditIncome: React.FC = () => {
  const dispatch = useDispatch();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (incomeDetails: any) =>
      dbService.updateDetails("income", incomeDetails),
  });
  const { id, amount, group, category } = useSelector(
    selectEditableIncomeOption
  );
  const [editableAmount, setEditableAmount] = useState<string>("");

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(saveIncomeDetails({ group, category, amount: +editableAmount }));
  }, [isSuccess]);

  useEffect(() => {
    setEditableAmount(`${amount}`);
  }, [amount]);

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableAmount(event.target.value);
  };
  const onCancel = () => {
    dispatch(resetEditIncomeEntry());
  };
  const onSave = () => {
    if (!NUMERIC_REGEX.test(editableAmount)) return;
    mutate({ id, group, category, amount: +editableAmount });
  };
  const isAmountError = !NUMERIC_REGEX.test(editableAmount);

  return (
    <div className={classes.income_edit__container}>
      <InfiniteProgressBar isLoading={isPending} />
      {isError && <ErrorMessage />}
      <div className={classes.edit__header}>
        <strong>Previous Amount</strong>
        <label>
          {category}: Rs. {amount}
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
            ? "Enter a valid amount ( max 2 decimal ) more than 0 (e.g. 100.50 or 100)"
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
  );
};
export default EditIncome;
