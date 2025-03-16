import { useState } from "react";
// library
import { TUITextField } from "triva-ui";
import { useMutation } from "@tanstack/react-query";
import { MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
// components
import { Select, EntryFormModal } from "src/components/common";
// service
import dbService from "src/service/Database";
// actions
import {
  resetActionIncomeEntry,
  saveIncomeDetails,
} from "src/store/income/income-actions";
// utils
import { updateState } from "src/utils/common-utils";
import { getCategoryError, getAmountError } from "src/utils/income-utils";
// types
import { AppDispatch } from "src/types/store-types";
// styles
import classes from "./IncomeDetails.module.scss";

interface IncomeFormError {
  category: string;
  amount: string;
}

interface IncomeComponent {
  category: string;
  amount: string;
  group: "salary" | "extra";
}
const INITIAL_INCOME_DETAILS: IncomeComponent = {
  category: "",
  amount: "",
  group: "salary",
};
const INITIAL_ERRORS: IncomeFormError = {
  category: "",
  amount: "",
};

const AddIncome: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (incomeDetails: object) =>
      dbService.createDetails("income", incomeDetails),
    onSuccess: (data) => {
      const { $id: id, group, category, amount } = data || {};
      dispatch(saveIncomeDetails({ id, group, category, amount }));
    },
  });

  const [incomeDetails, setIncomeDetails] = useState<IncomeComponent>(
    INITIAL_INCOME_DETAILS
  );
  const [errors, setErrors] = useState<IncomeFormError>(INITIAL_ERRORS);

  const onCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIncomeDetails(updateState("category", event.target.value));
    setErrors(updateState("category", getCategoryError(event.target.value)));
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount: string = event.target.value;
    setIncomeDetails(updateState("amount", amount));
    setErrors(updateState("amount", getAmountError(amount)));
  };

  const onGroupChange = (event: any) => {
    setIncomeDetails(updateState("group", event.target.value));
  };
  const onCancel = () => {
    dispatch(resetActionIncomeEntry());
  };
  const onAddIncome = () => {
    if (errors.category || errors.amount) return;

    const amountError = getAmountError(incomeDetails.amount);
    const categoryError = getCategoryError(incomeDetails.category);

    if (categoryError || amountError) {
      setErrors({ category: categoryError, amount: amountError });
      return;
    }
    mutate({
      category: incomeDetails.category.trim(),
      amount: +incomeDetails.amount,
      group: incomeDetails.group,
    });
  };

  const { category, amount, group } = incomeDetails;

  return (
    <EntryFormModal
      isPending={isPending}
      isError={isError}
      onCancel={onCancel}
      onSave={onAddIncome}
      saveBtnLabel="Add Income"
    >
      <div className={classes.income_edit__container}>
        <TUITextField
          fullWidth
          isRequired
          label="Income Category"
          id="add-income-form-category"
          inputProps={{ "data-testid": "add-income-form-category-input" }}
          value={category}
          onChange={onCategoryChange}
          helperText={"Enter category within min 100 characters"}
          errorMessage={errors.category}
          placeholder="Enter income category"
        />
        <TUITextField
          isRequired
          placeholder="Enter amount"
          label="Amount"
          type="number"
          fullWidth
          id="add-income-form-amount"
          inputProps={{ "data-testid": "add-income-form-amount-input" }}
          value={amount}
          onChange={onAmountChange}
          errorMessage={errors.amount}
        />
        <Select
          label="Group"
          value={group}
          onChange={onGroupChange}
          data-testid={`group-option`}
          fullWidth
        >
          <MenuItem value="salary">Salary income</MenuItem>
          <MenuItem value="extra">Extra Income</MenuItem>
        </Select>
      </div>
    </EntryFormModal>
  );
};
export default AddIncome;
