import { memo, useEffect, useState } from "react";
// library
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// icons
import LabelIcon from "@mui/icons-material/Label";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CancelIcon from "@mui/icons-material/Cancel";
// components
import { TextField } from "src/components/common/CommonComponents";
// icons
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
// actions
import { modifyIncomeDetails } from "src/store/income/income-actions";
// selectors
import { selectEditableIncome } from "src/store/income/income-selectors";
// types
import { IncomeComponent } from "src/types/income-types";
// utils
import { updateState } from "src/utils/common-utils";
// constants
import { NUMERIC_REGEX } from "src/constants/common-constants";
// styles
import classes from "./AddIncome.module.scss";
interface IncomeFormError {
  label: boolean;
  amount: boolean;
}
const FORM_ERROR_MESSAGE = {
  label: "Enter a label within min 100 characters",
  amount: "Enter a valid amount more than 0 (e.g. 100.50 or 100)",
};
const INITIAL_INCOME_DETAILS: IncomeComponent = {
  label: "",
  amount: "",
  group: "salary",
};
const INITIAL_ERRORS: IncomeFormError = {
  label: false,
  amount: false,
};
interface AddIncomeProps {
  onCancel: () => void;
}
const AddIncome: React.FC<AddIncomeProps> = ({ onCancel }) => {
  const dispatch = useDispatch();
  const editableIncome = useSelector(selectEditableIncome);

  const [incomeDetails, setIncomeDetails] = useState<IncomeComponent>(
    INITIAL_INCOME_DETAILS
  );
  const [errors, setErrors] = useState<IncomeFormError>(INITIAL_ERRORS);
  useEffect(() => {
    setIncomeDetails(editableIncome);
    setErrors({
      label: false,
      amount: false,
    });
  }, [editableIncome]);

  const onLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const modifiedLabel: string = event.target.value;
    setIncomeDetails(updateState("label", modifiedLabel));
    setErrors(
      updateState("label", modifiedLabel === "" || modifiedLabel.length > 100)
    );
  };
  const onLabelClear = () => {
    setIncomeDetails(updateState("label", ""));
    setErrors(updateState("label", false));
  };
  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount: string = event.target.value;
    setIncomeDetails(updateState("amount", amount));
    setErrors(updateState("amount", !NUMERIC_REGEX.test(amount)));
  };
  const onAmountClear = () => {
    setIncomeDetails(updateState("amount", ""));
    setErrors(updateState("amount", false));
  };
  const onGroupChange = (event: SelectChangeEvent) => {
    setIncomeDetails(updateState("group", event.target.value));
  };
  const onAddIncome = () => {
    if (errors.label || errors.amount) return;

    const isInvalidLabel = incomeDetails.label === "";
    const isInvalidAmount = !NUMERIC_REGEX.test(incomeDetails.amount);
    if (isInvalidLabel || isInvalidAmount) {
      setErrors({ label: isInvalidLabel, amount: isInvalidAmount });
      return;
    }
    dispatch(modifyIncomeDetails(incomeDetails));
    setIncomeDetails(INITIAL_INCOME_DETAILS);
    setErrors(INITIAL_ERRORS);
  };

  const { label, amount, group } = incomeDetails;
  return (
    <form className={classes.add_income__form}>
      <TextField
        label="Income Category"
        id="add-income-form-label"
        fullWidth
        disabled={editableIncome.label !== ""}
        inputProps={{ "data-testid": "add-income-form-label-input" }}
        value={label}
        onChange={onLabelChange}
        error={errors.label}
        helperText={errors.label && FORM_ERROR_MESSAGE.label}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LabelIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              {label && <CancelIcon onClick={onLabelClear} fontSize="small" />}
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Amount"
        id="add-income-form-amount"
        fullWidth
        inputProps={{ "data-testid": "add-income-form-amount-input" }}
        value={amount}
        onChange={onAmountChange}
        error={errors.amount}
        helperText={errors.amount && FORM_ERROR_MESSAGE.amount}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CurrencyRupeeIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              {amount && (
                <CancelIcon onClick={onAmountClear} fontSize="small" />
              )}
            </InputAdornment>
          ),
        }}
      />
      <FormControl fullWidth className={classes.income_group__select}>
        <label id="add-income-form-group-label">Group</label>
        <Select
          labelId="add-income-form-group-label"
          value={group}
          onChange={onGroupChange}
          fullWidth
        >
          <MenuItem value="salary">Salary income</MenuItem>
          <MenuItem value="extra">Extra Income</MenuItem>
        </Select>
      </FormControl>
      <div className={classes.action_btn__container}>
        <Button
          variant="outlined"
          data-testid="add-income-form-cancel-btn"
          onClick={onCancel}
          className={classes.action_btn__clear}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          data-testid="add-income-form-submit-btn"
          startIcon={<DataSaverOnIcon />}
          onClick={onAddIncome}
          className={classes.action_btn__submit}
        >
          {editableIncome.label === "" ? "Add" : "Update"}
        </Button>
      </div>
    </form>
  );
};
export default memo(AddIncome);
