import { useEffect, useState } from "react";
// library
import { TUITextField } from "triva-ui";
import { useMutation } from "@tanstack/react-query";
import { MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
// components
import {
  Button,
  Select,
  InfiniteProgressBar,
  ErrorMessage,
} from "src/components/common";
// service
import dbService from "src/service/Database";
// actions
import {
  resetEditIncomeEntry,
  saveIncomeDetails,
} from "src/store/income/income-actions";
// utils
import { updateState } from "src/utils/common-utils";
// types
import { AppDispatch } from "src/types/store-types";
// constants
import { NUMERIC_REGEX } from "src/constants/common-constants";
// styles
import classes from "./AddIncome.module.scss";

interface IncomeFormError {
  category: boolean;
  amount: boolean;
}
const FORM_ERROR_MESSAGE = {
  category: "Enter a label within min 100 characters",
  amount:
    "Enter a valid amount ( max 2 decimal ) more than 0 (e.g. 100.50 or 100)",
};
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
  category: false,
  amount: false,
};

const AddIncome: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (incomeDetails: object) =>
      dbService.createDetails("income", incomeDetails),
  });

  const [incomeDetails, setIncomeDetails] = useState<IncomeComponent>(
    INITIAL_INCOME_DETAILS
  );
  const [errors, setErrors] = useState<IncomeFormError>(INITIAL_ERRORS);

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(saveIncomeDetails({ ...incomeDetails, amount: +amount }));
    setIncomeDetails(INITIAL_INCOME_DETAILS);
    setErrors(INITIAL_ERRORS);
  }, [isSuccess]);

  const onCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const modifiedLabel: string = event.target.value;
    setIncomeDetails(updateState("category", modifiedLabel));
    setErrors(
      updateState(
        "category",
        modifiedLabel === "" || modifiedLabel.length > 100
      )
    );
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount: string = event.target.value;
    setIncomeDetails(updateState("amount", amount));
    setErrors(updateState("amount", !NUMERIC_REGEX.test(amount)));
  };

  const onGroupChange = (event: any) => {
    setIncomeDetails(updateState("group", event.target.value));
  };
  const onCancel = () => {
    dispatch(resetEditIncomeEntry());
  };
  const onAddIncome = () => {
    if (errors.category || errors.amount) return;

    const isInvalidCategory = incomeDetails.category === "";
    const isInvalidAmount = !NUMERIC_REGEX.test(incomeDetails.amount);
    if (isInvalidCategory || isInvalidAmount) {
      setErrors({ category: isInvalidCategory, amount: isInvalidAmount });
      return;
    }
    mutate({ ...incomeDetails, amount: +amount });
  };

  const { category, amount, group } = incomeDetails;

  return (
    <form className={classes.add_income__form}>
      {isError && <ErrorMessage />}
      <InfiniteProgressBar isLoading={isPending} />
      <TUITextField
        fullWidth
        label="Income Category"
        id="add-income-form-category"
        inputProps={{ "data-testid": "add-income-form-category-input" }}
        value={category}
        onChange={onCategoryChange}
        helperText={"Enter category within min 100 characters"}
        errorMessage={errors.category ? FORM_ERROR_MESSAGE.category : ""}
        placeholder="Enter income category"
      />
      <TUITextField
        placeholder="Enter amount"
        label="Amount"
        fullWidth
        id="add-income-form-amount"
        inputProps={{ "data-testid": "add-income-form-amount-input" }}
        value={amount}
        onChange={onAmountChange}
        errorMessage={errors.amount ? FORM_ERROR_MESSAGE.amount : ""}
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

      <div className={classes.action_btn__container}>
        <Button
          variant="text"
          data-testid="add-income-form-cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          border="round"
          data-testid="add-income-form-submit-btn"
          onClick={onAddIncome}
        >
          Add Income
        </Button>
      </div>
    </form>
  );
};
export default AddIncome;
