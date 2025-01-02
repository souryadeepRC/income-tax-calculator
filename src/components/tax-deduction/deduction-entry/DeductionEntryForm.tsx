import React, { memo, useState, useEffect } from "react";
// library
import { InputAdornment, Button, MenuItem } from "@mui/material";
// icons
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// components
import { TextField, Select } from "src/components/common/CommonComponents";
// utils
import { updateState } from "src/utils/common-utils";
// constants
import { NUMERIC_REGEX } from "src/constants/common-constants";
// types
import {
  DeductionEntry,
  DeductionEntryOption,
} from "src/types/deduction-types";
// styles
import classes from "./DeductionEntry.module.scss";

interface DeductionEntryFormProps {
  options: DeductionEntryOption[];
  entry: EntryInput | undefined;
  /* eslint-disable */
  onSave: (entryDetails: DeductionEntry) => void;
  onReset: () => void;
}
interface EntryInput {
  category: string;
  amount: string;
  maxLimit?: number;
}
interface EntryError {
  category: string;
  amount: string;
}
const INITIAL_ERROR = {
  category: "",
  amount: "",
};
const INITIAL_ENTRY = {
  category: "",
  amount: "",
};
const DeductionEntryForm: React.FC<DeductionEntryFormProps> = ({
  options,
  entry,
  onSave,
  onReset,
}) => {
  // store
  const [entryInput, setEntryInput] = useState<EntryInput>(INITIAL_ENTRY);
  const [error, setError] = useState<EntryError>(INITIAL_ERROR);
  useEffect(() => {
    if (!entry) return;
    setEntryInput({ ...entry, amount: `${entry.amount}` });
  }, [entry]);

  const onEntrySave = () => {
    if (entryInput.category === "" || entryInput.amount === "") {
      if (entryInput.amount === "") {
        setError(updateState("amount", "Amount cannot be empty"));
      }
      return;
    }
    onSave({
      category: entryInput.category,
      amount: +entryInput.amount,
      ...(entryInput?.maxLimit ? { maxLimit: entryInput.maxLimit } : {}),
    });
  };
  const onCategoryChange = (event: any) => {
    const enteredCategory = event.target.value as string;
    const maxLimit = options.find(
      (option) => option.category === enteredCategory
    )?.maxLimit;
    setEntryInput(updateState("category", enteredCategory));
    setEntryInput(updateState("maxLimit", maxLimit));
  };
  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredAmount: string = event.target.value;
    setEntryInput(updateState("amount", event.target.value));
    let errorMessage = "";
    if (!NUMERIC_REGEX.test(enteredAmount)) {
      errorMessage = "Enter a valid amount more than 0 (e.g. 100.50 or 100)";
    }
    setError(updateState("amount", errorMessage));
  };

  const { category, amount } = entryInput;
  const { amount: amountError } = error;
  return (
    <form className={classes.deduction_entry__form}>
      <Select
        label="Category"
        value={category}
        onChange={onCategoryChange}
        data-testid={`category-option`}
        fullWidth
      >
        {options.map((option) => (
          <MenuItem
            key={option.category}
            disabled={option.isAdded}
            value={option.category}
            data-testid={`category-option-${option.category}`}
          >
            {option.label}&nbsp;{option.isAdded && <i>(Already Added)</i>}
          </MenuItem>
        ))}
      </Select>
      <TextField
        className="deduction__option__input"
        label="Invested Amount"
        type="number"
        value={amount}
        onChange={onAmountChange}
        inputProps={{ "data-testid": "deduction-amount-input" }}
        error={amountError !== ""}
        helperText={amountError}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CurrencyRupeeIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <section
        className={classes.action_btn__container}
        aria-label="add rent entry form action button container"
      >
        <Button
          variant="text"
          data-testid="deduction-form-cancel-btn"
          onClick={onReset}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          data-testid="deduction-form-save-btn"
          className={classes.save__btn}
          onClick={onEntrySave}
        >
          Save
        </Button>
      </section>
    </form>
  );
};
export default memo(DeductionEntryForm);
