import { useRef, useState, useEffect } from "react";
// library
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { MenuItem } from "@mui/material";
import { TUITextField } from "triva-ui";
// components
import { EntryFormModal, Select } from "src/components/common";
// service
import dbService from "src/service/Database";
// store
import {
  resetDeductionAction,
  saveSection80CEntry,
} from "src/store/deduction/deduction-actions";
// utils
import { ErrorMessage, updateState } from "src/utils/common-utils";
// types
import {
  DeductionEntryOption,
  DeductionEntry,
} from "src/types/deduction-types";

interface DeductionEntryFormProps {
  options: DeductionEntryOption[];
  entry: DeductionEntry | undefined;
}
interface EntryInput {
  category: string;
  amount: string;
}

const Section80CEntryForm: React.FC<DeductionEntryFormProps> = ({
  options,
  entry,
}) => {
  const userActivity = useRef<boolean>(false);
  const dispatch = useDispatch();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (deduction: object) =>
      dbService.storeDetails("deduction", deduction),
    onSuccess: (data) => {
      const { $id: id, category, amount } = data;
      dispatch(
        saveSection80CEntry({
          id,
          category,
          amount,
        })
      );
    },
  });
  // store
  const [entryInput, setEntryInput] = useState<EntryInput>({
    category: "",
    amount: "",
  });
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (!entry) return;
    const { category, amount } = entry;
    setEntryInput({ category, amount: `${amount}` });
  }, [entry]);

  const onEntrySave = () => {
    if (error) return;
    if (userActivity.current) {
      const amountError: string = ErrorMessage.amountInput(entryInput.amount);
      if (amountError) {
        setError(amountError);
        return;
      }
    }

    mutate({
      id: entry?.id,
      category: entryInput.category,
      amount: +entryInput.amount,
    });
  };
  const onCategoryChange = (event: any) => {
    setEntryInput(updateState("category", event.target.value as string));
  };
  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount: string = event.target.value;
    setEntryInput(updateState("amount", amount));
    setError(ErrorMessage.amountInput(amount));
    if (!userActivity.current) {
      userActivity.current = true;
    }
  };

  const onReset = () => {
    dispatch(resetDeductionAction());
  };

  return (
    <EntryFormModal
      isPending={isPending}
      isError={isError}
      onSave={onEntrySave}
      onCancel={onReset}
    >
      <Select
        label="Category"
        value={entryInput.category}
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
        value={entryInput.amount}
        onChange={onAmountChange}
        inputProps={{ "data-testid": "deduction-amount-input" }}
        errorMessage={error}
      />
    </EntryFormModal>
  );
};
export default Section80CEntryForm;
