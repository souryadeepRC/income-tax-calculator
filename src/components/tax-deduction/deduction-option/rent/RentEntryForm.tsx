import { useState, useEffect, useCallback } from "react";
// library
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { TUITextField } from "triva-ui";
// components
import { Choice, EntryFormModal } from "src/components/common";
// service
import dbService from "src/service/Database";
// actions
import {
  resetDeduction,
  saveRentEntry,
} from "src/store/deduction/deduction-reducer";
// utils
import { ErrorMessage } from "src/utils/common-utils";
import { formatNumber } from "src/utils/tax-calculation";
// constants
import { DEDUCTION_TYPE, RENT_CITY } from "src/constants/common-constants";

interface RentEntryFormProps {
  maxDuration: number;
  entry: any;
}
interface EntryInput {
  amount: string;
  duration: string;
  category: string;
}
interface EntryError {
  amount: string;
  duration: string;
}

const RentEntryForm: React.FC<RentEntryFormProps> = (props) => {
  const { entry, maxDuration } = props;

  // store
  const dispatch = useDispatch();
  const [rentEntry, setRentEntry] = useState<EntryInput>({
    amount: "",
    duration: "",
    category: RENT_CITY.METRO,
  });
  const [error, setError] = useState<EntryError>({
    amount: "",
    duration: "",
  });
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (deduction: object) =>
      dbService.storeDetails("deduction", deduction),
    onSuccess: (data: any) => {
      const { $id: id, amount, duration, category } = data || {};
      toast.success(
        `Rent entry of Rs. ${formatNumber(amount)} ${entry?.id ? "updated" : "added"}`
      );
      dispatch(
        saveRentEntry({
          id,
          amount,
          duration,
          isMetroCity: category === RENT_CITY.METRO,
        })
      );
    },
  });

  // set previous rent entry details for Edit scenario
  useEffect(() => {
    if (!entry) return;
    const { amount, duration, isMetroCity } = entry;

    setRentEntry({
      ...rentEntry,
      amount: `${amount}`,
      duration: `${duration}`,
      category: isMetroCity ? RENT_CITY.METRO : RENT_CITY.NON_METRO,
    });
  }, [entry]);

  // Change Rent Entry
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name = "", value = "" } = event?.target || {};
    const errorMessage: string =
      name === "amount"
        ? ErrorMessage.amountInput(value)
        : ErrorMessage.rentDuration(value, maxDuration);
    setRentEntry((rentEntry) => ({
      ...rentEntry,
      [name]: value,
    }));
    setError((error) => ({
      ...error,
      [name]: errorMessage,
    }));
  }, []);

  /* eslint-disable */
  const onCityChange = (selectedValue: string) => {
    setRentEntry((rentEntry) => ({
      ...rentEntry,
      category: selectedValue,
    }));
  };
  // Save Rent Entry and call API
  const onRentEntrySave = () => {
    if (error.amount || error.duration) return;

    const errorMessage = {
      amount: ErrorMessage.amountInput(amount),
      duration: ErrorMessage.rentDuration(duration, maxDuration),
    };
    if (errorMessage.amount || errorMessage.duration) {
      setError(errorMessage);
      return;
    }
    mutate({
      type: DEDUCTION_TYPE.RENT,
      id: entry?.id,
      amount: +amount,
      duration: +duration,
      category: category,
    });
  };

  const onReset = () => {
    dispatch(resetDeduction());
  };
  const { amount, duration, category } = rentEntry;
  return (
    <EntryFormModal
      isPending={isPending}
      isError={isError}
      onSave={onRentEntrySave}
      onCancel={onReset}
      saveBtnLabel="Add Rent"
    >
      <TUITextField
        fullWidth
        label="Monthly Rental Amount"
        type="number"
        name="amount"
        value={amount}
        onChange={onChange}
        inputProps={{ "data-testid": "rent-amount-input" }}
        errorMessage={error.amount}
      />
      <TUITextField
        fullWidth
        label="Rent Duration (in Month)"
        type="number"
        name="duration"
        value={duration}
        onChange={onChange}
        inputProps={{ "data-testid": "rent-duration-input" }}
        errorMessage={error.duration}
      />
      <Choice
        title="Rent location"
        options={[
          {
            label: "Metro",
            value: RENT_CITY.METRO,
          },
          {
            label: "Non Metro",
            value: RENT_CITY.NON_METRO,
          },
        ]}
        onChoice={onCityChange}
        selectedOption={category}
      />
    </EntryFormModal>
  );
};
export default RentEntryForm;
