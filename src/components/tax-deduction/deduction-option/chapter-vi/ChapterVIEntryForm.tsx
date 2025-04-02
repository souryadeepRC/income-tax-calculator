import { useState, useEffect } from "react";
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
  resetDeduction,
  saveChapterVIEntry,
} from "src/store/deduction/deduction-reducer";
// utils
import { ErrorMessage, updateState } from "src/utils/common-utils";
// constants
import { DEDUCTION_TYPE } from "src/constants/common-constants";
// types
import {
  DeductionEntryOption,
  DeductionOption,
} from "src/types/deduction-types";

interface DeductionEntryFormProps {
  options: DeductionEntryOption[];
  entry: DeductionOption | undefined;
}
interface EntryInput {
  category: string;
  amount: string;
}

const ChapterVIEntryForm: React.FC<DeductionEntryFormProps> = ({
  options,
  entry,
}) => {
  const dispatch = useDispatch();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (deduction: object) =>
      dbService.storeDetails("deduction", deduction),
    onSuccess: (data: any) => {
      const { $id: id, category, amount } = data;
      dispatch(
        saveChapterVIEntry({
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
  const [error, setError] = useState<EntryInput>({ category: "", amount: "" });
  useEffect(() => {
    if (!entry) return;
    const { category, amount } = entry;
    setEntryInput({ category, amount: `${amount}` });
  }, [entry]);

  const onEntrySave = () => {
    if (error.category || error.amount) return;

    const errorMessage = {
      category: ErrorMessage.category(entryInput.category),
      amount: ErrorMessage.amountInput(entryInput.amount),
    };

    if (errorMessage.category || errorMessage.amount) {
      setError(errorMessage);
      return;
    }

    mutate({
      type: DEDUCTION_TYPE.CHAPTER_VIA,
      id: entry?.id,
      category: entryInput.category,
      amount: +entryInput.amount,
    });
  };
  const onCategoryChange = (event: any) => {
    setEntryInput(updateState("category", event.target.value as string));
    setError(
      updateState(
        "category",
        ErrorMessage.category(event.target.value as string)
      )
    );
  };
  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount: string = event.target.value;
    setEntryInput(updateState("amount", amount));
    setError(updateState("amount", ErrorMessage.amountInput(amount)));
  };

  const onReset = () => {
    dispatch(resetDeduction());
  };

  return (
    <EntryFormModal
      isPending={isPending}
      isError={isError}
      onSave={onEntrySave}
      onCancel={onReset}
      saveBtnLabel={`${entry?.id ? "Modify" : "Add"} Investment`}
    >
      <Select
        label="Category"
        value={entryInput.category}
        onChange={onCategoryChange}
        data-testid={`category-option`}
        fullWidth
        errorMessage={error.category}
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
        errorMessage={error.amount}
      />
    </EntryFormModal>
  );
};
export default ChapterVIEntryForm;
