import { useRef, useState, useEffect } from "react";
// library
import { useDispatch } from "react-redux";
import { TUITextField } from "triva-ui";
import { useMutation } from "@tanstack/react-query";
// components
import { EntryFormModal } from "src/components/common";
//service
import dbService from "src/service/Database";
//store
import {
  resetDeduction,
  saveSection24Entry,
} from "src/store/deduction/deduction-reducer";
// utils
import { ErrorMessage } from "src/utils/common-utils";
// constants
import { DEDUCTION_TYPE } from "src/constants/common-constants";

interface Section24EntryFormProps {
  entry: any;
}

const Section24EntryForm: React.FC<Section24EntryFormProps> = ({ entry }) => {
  const dispatch = useDispatch();
  const userActivity = useRef<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (deduction: object) =>
      dbService.storeDetails("deduction", deduction),
    onSuccess: (data) => {
      const { $id: id, amount } = data || {};
      dispatch(saveSection24Entry({ id, amount }));
    },
  });

  useEffect(() => {
    if (!entry) return;
    setAmount(`${entry.amount}`);
  }, [entry]);

  const onEntrySave = () => {
    if (error) return;
    if (!userActivity.current) {
      const errorMessage = ErrorMessage.amountInput(amount);
      if (errorMessage) {
        setError(errorMessage);
        return;
      }
    }
    mutate({
      type: DEDUCTION_TYPE.SECTION24,
      id: entry?.id,
      amount: +amount,
    });
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount: string = event.target.value;
    setAmount(amount);
    setError(ErrorMessage.amountInput(amount));
    if (!userActivity.current) {
      userActivity.current = true;
    }
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
    >
      <TUITextField
        fullWidth
        label="Section 24 - Home Loan Interest"
        value={amount}
        onChange={onAmountChange}
        inputProps={{ "data-testid": "section24-input" }}
        errorMessage={error}
      />
    </EntryFormModal>
  );
};
export default Section24EntryForm;
