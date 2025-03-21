import React, { memo, useState, useEffect } from "react";
// library
import { MenuItem } from "@mui/material";
import { TUITextField } from "triva-ui";
// components
import { Button, Select } from "src/components/common";
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
import DeductionEntryForm from "../DeductionEntryForm";
import { useMutation } from "@tanstack/react-query";
import dbService from "src/service/Database";
import { resetDeductionAction } from "src/store/deduction/deduction-actions";
import { useDispatch } from "react-redux";

interface DeductionEntryFormProps {
  options: DeductionEntryOption[];
  entry: any;
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
const Section80CEntryForm: React.FC<DeductionEntryFormProps> = ({
  options,
  entry,
}) => {
  const dispatch = useDispatch();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (deduction: object) =>
      dbService.storeDetails("deduction", deduction),
    onSuccess: (data) => {
      console.log(data);
      /*  dispatch(
        saveRentEntry({ amount: +amount, duration: +duration, isMetroCity })
      ); */
    },
  });
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
    mutate({
      id: entry?.id || undefined,
      category: entryInput.category,
      amount: +entryInput.amount,
    });
    /* onSave({
      category: entryInput.category,
      amount: +entryInput.amount,
      ...(entryInput?.maxLimit ? { maxLimit: entryInput.maxLimit } : {}),
    }); */
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

  const onReset = () => {
    dispatch(resetDeductionAction());
  };
  const { category, amount } = entryInput;
  const { amount: amountError } = error;

  return (
    <DeductionEntryForm
      isPending={isPending}
      isError={isError}
      onSave={onEntrySave}
      onCancel={onReset}
    >
      <Select
        label="Category"
        value={category}
        onChange={onCategoryChange}
        data-testid={`category-option`}
        fullWidth
      >
        {options.map((option) => {
          const isDisabled: boolean =
            option.isAdded && option.category !== entry?.category;
          return (
            <MenuItem
              key={option.category}
              disabled={isDisabled}
              value={option.category}
              data-testid={`category-option-${option.category}`}
            >
              {option.label}&nbsp;
              {isDisabled && <i>(Already Added)</i>}
            </MenuItem>
          );
        })}
      </Select>
      <TUITextField
        fullWidth
        label="Invested Amount"
        type="number"
        value={amount}
        onChange={onAmountChange}
        inputProps={{ "data-testid": "deduction-amount-input" }}
        errorMessage={amountError}
      />
    </DeductionEntryForm>
  );
};
export default Section80CEntryForm;
