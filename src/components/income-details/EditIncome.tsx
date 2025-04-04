import { useEffect, useState } from "react";
// library
import { TUITextField } from "triva-ui";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
// components
import { EntryFormModal } from "src/components/common";
// service
import dbService from "src/service/Database";
// store
import {
  resetActionIncomeEntry,
  saveIncomeDetails,
} from "src/store/income/income-reducer";
// types
import { IncomeOption } from "src/types/income-types";
// utils
import { getAmountError } from "src/utils/income-utils";
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./IncomeDetails.module.scss";

interface EditIncomeProps {
  entry: IncomeOption;
}
const EditIncome: React.FC<EditIncomeProps> = ({ entry }) => {
  const dispatch = useDispatch();

  const { id, amount, group, category } = entry;
  const [editableAmount, setEditableAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (incomeDetails: any) =>
      dbService.updateDetails("income", incomeDetails),
    onSuccess: (data: any) => {
      const { $id: id, group, category, amount } = data || {};
      dispatch(saveIncomeDetails({ id, group, category, amount }));
    },
  });

  useEffect(() => {
    setEditableAmount(`${amount}`);
  }, [amount]);

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableAmount(event.target.value);
    setError(getAmountError(event.target.value));
  };
  const onCancel = () => {
    dispatch(resetActionIncomeEntry());
  };
  const onSave = () => {
    if (error) return;
    const errorMessage = getAmountError(editableAmount);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    mutate({ id, group, category, amount: +editableAmount });
  };

  return (
    <EntryFormModal
      isPending={isPending}
      isError={isError}
      onCancel={onCancel}
      onSave={onSave}
      saveBtnLabel="Modify Income"
      className={classes.income_edit__container}
    >
      <div className={classes.edit__header}>
        <strong>Previous Amount</strong>
        <label>
          {category}: Rs. {formatNumber(amount)}
        </label>
      </div>
      <TUITextField
        isRequired
        label="Amount"
        id="edit-income-amount"
        inputProps={{ "data-testid": "edit-income-amount-input" }}
        value={editableAmount}
        onChange={onAmountChange}
        errorMessage={error}
      />
    </EntryFormModal>
  );
};
export default EditIncome;
