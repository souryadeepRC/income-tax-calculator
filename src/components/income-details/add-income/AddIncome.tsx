import { memo, useState } from "react";
// library
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "react-redux";
// components
import { Modal, Button } from "src/components/common/CommonComponents";
// actions
import { saveIncomeDetails } from "src/store/income/income-actions";
// utils
import { updateState } from "src/utils/common-utils";
// types
import { AppDispatch } from "src/types/store-types";
// constants
import { NUMERIC_REGEX } from "src/constants/common-constants";
// styles
import classes from "./AddIncome.module.scss";
import { TUITextField } from "triva-ui";
interface IncomeFormError {
  label: boolean;
  amount: boolean;
}
const FORM_ERROR_MESSAGE = {
  label: "Enter a label within min 100 characters",
  amount: "Enter a valid amount more than 0 (e.g. 100.50 or 100)",
};
interface IncomeComponent {
  label: string;
  amount: string;
  category: "salary" | "extra";
}
const INITIAL_INCOME_DETAILS: IncomeComponent = {
  label: "",
  amount: "",
  category: "salary",
};
const INITIAL_ERRORS: IncomeFormError = {
  label: false,
  amount: false,
};
interface AddIncomeProps {
  onCancel: () => void;
}
const AddIncome: React.FC<AddIncomeProps> = ({ onCancel }) => {
  const dispatch: AppDispatch = useDispatch();

  const [incomeDetails, setIncomeDetails] = useState<IncomeComponent>(
    INITIAL_INCOME_DETAILS
  );
  const [errors, setErrors] = useState<IncomeFormError>(INITIAL_ERRORS);

  const onLabelChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const modifiedLabel: string = event.target.value;
    setIncomeDetails(updateState("label", modifiedLabel));
    setErrors(
      updateState("label", modifiedLabel === "" || modifiedLabel.length > 100)
    );
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount: string = event.target.value;
    setIncomeDetails(updateState("amount", amount));
    setErrors(updateState("amount", !NUMERIC_REGEX.test(amount)));
  };

  const onCategoryChange = (event: SelectChangeEvent) => {
    setIncomeDetails(updateState("category", event.target.value));
  };
  const onAddIncome = () => {
    if (errors.label || errors.amount) return;

    const isInvalidLabel = incomeDetails.label === "";
    const isInvalidAmount = !NUMERIC_REGEX.test(incomeDetails.amount);
    if (isInvalidLabel || isInvalidAmount) {
      setErrors({ label: isInvalidLabel, amount: isInvalidAmount });
      return;
    }
    dispatch(saveIncomeDetails({ ...incomeDetails, amount: +amount }));
    setIncomeDetails(INITIAL_INCOME_DETAILS);
    setErrors(INITIAL_ERRORS);
  };

  const { label, amount, category } = incomeDetails;

  return (
    <Modal isOpen={true} onClose={onCancel}>
      <form className={classes.add_income__form}>
        <TUITextField
          fullWidth
          label="Income Category"
          id="add-income-form-label"
          inputProps={{ "data-testid": "add-income-form-label-input" }}
          value={label}
          onChange={onLabelChange}
          helperText={FORM_ERROR_MESSAGE.label}
          errorMessage={errors.label ? FORM_ERROR_MESSAGE.amount : ""}
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
        <FormControl fullWidth className={classes.income_group__select}>
          <label id="add-income-form-group-label">Group</label>
          <Select
            labelId="add-income-form-group-label"
            value={category}
            onChange={onCategoryChange}
            fullWidth
          >
            <MenuItem value="salary">Salary income</MenuItem>
            <MenuItem value="extra">Extra Income</MenuItem>
          </Select>
        </FormControl>
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
    </Modal>
  );
};
export default memo(AddIncome);
