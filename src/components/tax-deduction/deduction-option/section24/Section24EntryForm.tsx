import React, { memo, useState, useEffect } from "react";
// library
import { MenuItem } from "@mui/material";
import { TUITextField } from "triva-ui";
// components
import { Button, Select } from "src/components/common";
// utils
import { updateState } from "src/utils/common-utils";
// constants
import { DEDUCTION_TYPE, NUMERIC_REGEX } from "src/constants/common-constants";
// types
import {
  DeductionEntry,
  DeductionEntryOption,
} from "src/types/deduction-types";
// styles
import { useDispatch } from "react-redux";
import { resetDeductionAction } from "src/store/deduction/deduction-actions";
import { useMutation } from "@tanstack/react-query";
import dbService from "src/service/Database";
import DeductionEntryForm from "../../DeductionEntryForm";

interface Section24EntryFormProps {
  entry: any;
}

const Section24EntryForm: React.FC<Section24EntryFormProps> = ({ entry }) => {
  const dispatch = useDispatch();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (deduction: object) =>
      dbService.storeDetails("deduction", deduction),
    onSuccess: (data) => {
      console.log(data);
    },
  });
  // store
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!entry) return;
    setAmount(`${amount}`);
  }, [entry]);

  const onEntrySave = () => {
    if (amount === "") {
      setError("Amount is required");
      return;
    }
    mutate({
      id: entry?.id || undefined,
      type: DEDUCTION_TYPE.SECTION24,
      amount: +amount,
    });
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredAmount: string = event.target.value;
    setAmount(enteredAmount);
    let errorMessage = "";
    if (!NUMERIC_REGEX.test(enteredAmount)) {
      errorMessage =
        "Enter a valid amount (up to 2 decimal) more than 0 (e.g. 100.50 or 100)";
    }
    setError(errorMessage);
  };
  const onReset = () => {
    dispatch(resetDeductionAction());
  };

  return (
    <DeductionEntryForm
      isPending={isPending}
      isError={isError}
      onSave={onEntrySave}
      onCancel={onReset}
    >
      <TUITextField
        fullWidth
        label="Section 24 - Home Loan Interest"
        value={amount}
        onChange={onAmountChange}
        type="number"
        inputProps={{ "data-testid": "section24-input" }}
        errorMessage={error}
      />
    </DeductionEntryForm>
  );
};
export default Section24EntryForm;
