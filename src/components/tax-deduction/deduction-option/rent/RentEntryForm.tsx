import React, { memo, useState, useEffect } from "react";
// library
import { useDispatch } from "react-redux";
import { TUITextField } from "triva-ui";
import { Switch } from "@mui/material";
// components
import { Modal, Button } from "src/components/common/CommonComponents";
// actions
import {
  resetEditRentEntry,
  saveRentEntry,
} from "src/store/deduction/deduction-actions";
// utils
import { updateState } from "src/utils/common-utils";
// constants
import { NUMERIC_REGEX } from "src/constants/common-constants";
// styles
import classes from "./Rent.module.scss";

interface RentEntryFormProps {
  durationLeft: number;
  rentEntry: EntryInput | undefined;
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
const INITIAL_ERROR = {
  amount: "",
  duration: "",
};
const INITIAL_RENT_ENTRY = {
  amount: "",
  duration: "",
  isMetroCity: false,
};
const RentEntryForm: React.FC<RentEntryFormProps> = ({
  durationLeft,
  rentEntry,
}) => {
  // store
  const dispatch = useDispatch();
  const [entryInput, setEntryInput] = useState<EntryInput>(INITIAL_RENT_ENTRY);
  const [error, setError] = useState<EntryError>(INITIAL_ERROR);
  useEffect(() => {
    setEntryInput(rentEntry || INITIAL_RENT_ENTRY);
  }, [rentEntry]);

  const onRentEntrySave = () => {
    if (error.amount || error.duration) return;
    if (!amount || !duration) {
      if (!NUMERIC_REGEX.test(amount)) {
        setError(
          updateState(
            "amount",
            "Enter a valid amount more than 0 (e.g. 100.50 or 100)"
          )
        );
      }
      if (!NUMERIC_REGEX.test(duration)) {
        setError(
          updateState(
            "duration",
            "Enter a valid duration more than 0 (e.g. 2 or 2.5)"
          )
        );
      }
      return;
    }

    dispatch(
      saveRentEntry({ amount: +amount, duration: +duration, isMetroCity })
    );
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
  const onDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredDuration: string = event.target.value;
    setEntryInput(updateState("duration", event.target.value));
    let errorMessage = "";
    if (!NUMERIC_REGEX.test(enteredDuration)) {
      errorMessage = "Enter a valid duration more than 0 (e.g. 2 or 2.5)";
    } else if (Number(enteredDuration) > durationLeft) {
      errorMessage =
        "Cannot add more than 12 months for a FY.Please check other entries";
    }
    setError(updateState("duration", errorMessage));
  };
  /* eslint-disable */
  const onCityChange = (event: any) => {
    setEntryInput(updateState("isMetroCity", event.target.checked));
  };
  const handleFormReset = () => {
    dispatch(resetEditRentEntry());
  };
  const { amount, duration, isMetroCity } = entryInput;
  const { amount: amountError, duration: durationError } = error;
  return (
    <Modal onClose={handleFormReset}>
      <form className={classes.add_rent_entry__form}>
        <TUITextField
          fullWidth
          label="Monthly Rental Amount"
          type="number"
          value={amount}
          onChange={onAmountChange}
          inputProps={{ "data-testid": "rent-amount-input" }}
          errorMessage={amountError}
        />
        <TUITextField
          fullWidth
          label="Rent Duration (in Month)"
          type="number"
          value={duration}
          onChange={onDurationChange}
          inputProps={{ "data-testid": "rent-duration-input" }}
          errorMessage={durationError}
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
        <section
          className={classes.action_btn__container}
          aria-label="add rent entry form action button container"
        >
          <Button
            variant="text"
            data-testid="rent-form-cancel-btn"
            onClick={handleFormReset}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            border="round"
            data-testid="rent-form-save-btn"
            onClick={onRentEntrySave}
          >
            Save
          </Button>
        </section>
      </form>
    </Modal>
  );
};
export default memo(RentEntryForm);
