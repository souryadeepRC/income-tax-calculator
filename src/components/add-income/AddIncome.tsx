import { memo, useEffect, useState } from "react";
// library
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// components
import { Button } from "src/components/common/CommonComponents";
// icons
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
// hooks
import { useNotifyMessage } from "src/hooks/useNotifyMessage";
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

const FORM_ERROR_MESSAGE = {
  label: "Enter a label within min 100 characters",
  amount: "Enter a valid amount more than 0 (e.g. 100.50 or 100)",
};
const AddIncome: React.FC = () => {
  const { notify } = useNotifyMessage();
  const dispatch = useDispatch();
  const editableIncome = useSelector(selectEditableIncome);

  const [incomeDetails, setIncomeDetails] = useState<IncomeComponent>({
    label: "",
    amount: "",
    group: "salary",
  });
  const [errors, setErrors] = useState<{ label: boolean; amount: boolean }>({
    label: false,
    amount: false,
  });
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
  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount: string = event.target.value;
    setIncomeDetails(updateState("amount", amount));
    setErrors(updateState("amount", !NUMERIC_REGEX.test(amount)));
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
    notify(`Income with Rs. ${incomeDetails.amount} saved.`);
  };

  const { label, amount, group } = incomeDetails;
  return (
    <section className={classes.add_income__container}>
      <div className={classes.add_income__label} data-testid="add-income-label">
        <span>Add a new component </span>
        <span>or Click existing component to update</span>
      </div>
      <TextField
        label="Income label"
        id="add-income-form-label"
        fullWidth
        inputProps={{ "data-testid": "add-income-form-label-input" }}
        value={label}
        onChange={onLabelChange}
        error={errors.label}
        helperText={errors.label && FORM_ERROR_MESSAGE.label}
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
      />
      <FormControl fullWidth>
        <InputLabel id="add-income-form-group-label">Group</InputLabel>
        <Select
          labelId="add-income-form-group-label"
          value={group}
          onChange={onGroupChange}
          fullWidth
          label="Group"
        >
          <MenuItem value="salary">Salary income</MenuItem>
          <MenuItem value="extra">Extra Income</MenuItem>
        </Select>
      </FormControl>
      <Button
        data-testid="add-income-form-btn"
        startIcon={<DataSaverOnIcon />}
        onClick={onAddIncome}
      >
        {editableIncome.label === "" ? "Add" : "Update"}
      </Button>
    </section>
  );
};
export default memo(AddIncome);
