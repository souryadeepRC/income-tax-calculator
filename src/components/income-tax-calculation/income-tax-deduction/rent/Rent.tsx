import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import { Button, Checkbox, TextField } from "@mui/material";
// hooks
import { useNotifyMessage } from "src/hooks/useNotifyMessage";
// actions
import { updateRentDeduction } from "src/store/deduction/deduction-actions";
// selectors
import { selectRentDeduction } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/store/reducer-types";
import { RentDeductionType } from "src/types/deduction-types";
// styles
import "../deduction-element.scss";

export const Rent = () => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const { amount, duration }: RentDeductionType =
    useSelector(selectRentDeduction);
  // hooks
  const { notify } = useNotifyMessage();
  // state
  const [isMetroCity, setIsMetroCity] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  // refs
  const rentAmountRef = useRef<HTMLInputElement>(null);
  const rentDurationRef = useRef<HTMLInputElement>(null);

  const onSave = () => {
    const duration: number = Number(rentDurationRef?.current?.value || 0);
    if (duration > 12 || duration < 1) {
      setIsError(true);
    } else {
      setIsError(false);
      dispatch(
        updateRentDeduction({
          amount: Number(rentAmountRef?.current?.value || 0),
          duration: duration,
          isMetroCity,
        })
      );
      notify("Deduction by Rent saved");
    }
  };

  return (
    <section className="deduction__option">
      <section className="deduction__option-content">
        <TextField
          className="deduction__option__input"
          label="Monthly Rental Amount"
          inputRef={rentAmountRef}
          defaultValue={amount}
          type="number"
        />
        <TextField
          className="deduction__option__input"
          variant="outlined"
          label="Rent Duration (in Month)"
          inputRef={rentDurationRef}
          defaultValue={duration}
          type="number"
          InputProps={{
            inputProps: { min: 1, max: 12 },
          }}
          helperText={
            isError && <span className="error">Max Limit between 0 to 12</span>
          }
        />
        <div>
          <label className="deduction__option__label">Metro City</label>
          <Checkbox
            className="deduction__option__checkbox"
            checked={isMetroCity}
            onChange={() => setIsMetroCity((isMetroCity) => !isMetroCity)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      </section>
      <Button className="deduction__option__button" onClick={onSave}>
        Save
      </Button>
    </section>
  );
};
