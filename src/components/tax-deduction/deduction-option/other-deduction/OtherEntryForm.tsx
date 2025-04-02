import { useState, useEffect, useCallback } from "react";
// library
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { TUITextField } from "triva-ui";
// components
import { EntryFormModal } from "src/components/common";
// service
import dbService from "src/service/Database";
// actions
import {
  resetDeduction,
  saveOtherEntry,
} from "src/store/deduction/deduction-reducer";
// utils
import { ErrorMessage } from "src/utils/common-utils";
// constants
import { DEDUCTION_TYPE } from "src/constants/common-constants";
import { DeductionOption } from "src/types/deduction-types";

interface OtherEntryFormProps {
  entry: DeductionOption | undefined;
}
interface EntryInput {
  category: string;
  amount: string;
}
interface EntryError {
  amount: string;
  category: string;
}

const OtherEntryForm: React.FC<OtherEntryFormProps> = ({ entry }) => {
  // store
  const dispatch = useDispatch();
  const [entryInput, setEntryInput] = useState<EntryInput>({
    amount: "",
    category: "",
  });
  const [error, setError] = useState<EntryError>({
    amount: "",
    category: "",
  });
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (deduction: object) =>
      dbService.storeDetails("deduction", deduction),
    onSuccess: (data: any) => {
      const { $id: id, amount, category } = data || {};
      dispatch(
        saveOtherEntry({
          id,
          amount,
          category,
        })
      );
    },
  });

  // set previous rent entry details for Edit scenario
  useEffect(() => {
    if (!entry) return;
    const { amount, category } = entry;
    setEntryInput({
      amount: `${amount}`,
      category,
    });
  }, [entry]);

  // Change Rent Entry
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name = "", value = "" } = event?.target || {};
    const errorMessage: string =
      name === "amount"
        ? ErrorMessage.amountInput(value)
        : ErrorMessage.category(value);
    setEntryInput((rentEntry) => ({
      ...rentEntry,
      [name]: value,
    }));
    setError((error) => ({
      ...error,
      [name]: errorMessage,
    }));
  }, []);

  // Save Rent Entry and call API
  const onRentEntrySave = () => {
    if (error.amount || error.category) return;

    const errorMessage = {
      amount: ErrorMessage.amountInput(amount),
      category: ErrorMessage.category(category),
    };
    if (errorMessage.amount || errorMessage.category) {
      setError(errorMessage);
      return;
    }
    mutate({
      type: DEDUCTION_TYPE.OTHERS,
      id: entry?.id,
      amount: +amount,
      category,
    });
  };

  const onReset = () => {
    dispatch(resetDeduction());
  };
  const { amount, category } = entryInput;
  return (
    <EntryFormModal
      isPending={isPending}
      isError={isError}
      onSave={onRentEntrySave}
      onCancel={onReset}
      saveBtnLabel={`${entry?.id ? "Modify" : "Add"} Investment`}
    >
      <TUITextField
        fullWidth
        label="Category"
        name="category"
        value={category}
        onChange={onChange}
        inputProps={{ "data-testid": "rent-category-input" }}
        errorMessage={error.category}
      />
      <TUITextField
        fullWidth
        label="Amount"
        name="amount"
        value={amount}
        onChange={onChange}
        inputProps={{ "data-testid": "rent-amount-input" }}
        errorMessage={error.amount}
      />
    </EntryFormModal>
  );
};
export default OtherEntryForm;
