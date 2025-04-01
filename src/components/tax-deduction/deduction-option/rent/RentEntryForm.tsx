import { useState, useEffect, useCallback } from "react";
// library
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { TUITextField } from "triva-ui";
import { Switch } from "@mui/material";
// components
import { EntryFormModal } from "src/components/common";
// service
import dbService from "src/service/Database";
// actions
import {
  resetDeductionAction,
  saveRentEntry,
} from "src/store/deduction/deduction-actions";
// utils
import { ErrorMessage } from "src/utils/common-utils";
// constants
import { DEDUCTION_TYPE, RENT_CITY } from "src/constants/common-constants";

interface RentEntryFormProps {
  maxDuration: number;
  entry: any;
}
interface EntryInput {
  amount: string;
  duration: string;
  isMetroCity: boolean;
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
    isMetroCity: false,
  });
  const [error, setError] = useState<EntryError>({
    amount: "",
    duration: "",
  });
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (deduction: object) =>
      dbService.storeDetails("deduction", deduction),
    onSuccess: (data) => {
      const { $id: id, amount, duration, category } = data || {};
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
    setRentEntry(entry);
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
  const onCityChange = (event: any) => {
    setRentEntry((rentEntry) => ({
      ...rentEntry,
      isMetroCity: event.target.checked,
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
      category: isMetroCity ? RENT_CITY.METRO : RENT_CITY.NON_METRO,
    });
  };

  const onReset = () => {
    dispatch(resetDeductionAction());
  };
  const { amount, duration, isMetroCity } = rentEntry;
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
      <section aria-label="rent metro city switch">
        <label>
          I&#39;m residing in a
          <Switch
            data-testid="rent-city-switch"
            checked={isMetroCity}
            onChange={onCityChange}
          />
          {isMetroCity ? "Metro" : "Non-metro"} City
        </label>
      </section>
    </EntryFormModal>
  );
};
export default RentEntryForm;
