import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import { TextField, Button } from "src/components/common/CommonComponents";
// actions
import { updateSection24Deduction } from "src/store/deduction/deduction-actions";
// selectors
import { selectSection24 } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/store/reducer-types";
// styles
import "../deduction-element.scss";
export const Section24 = () => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const section24Amount: number = useSelector(selectSection24);
  // refs
  const amountRef = useRef<HTMLInputElement>(null);
  const onSave = () => {
    dispatch(updateSection24Deduction(Number(amountRef?.current?.value || 0)));
  };
  return (
    <section className="deduction__option">
      <section className="deduction__option-content">
        <TextField
          variant="outlined"
          label="Section 24 - Home Loan Interest"
          inputRef={amountRef}
          defaultValue={section24Amount}
          type="number"
          InputProps={{
            inputProps: { min: 0, max: 200000 },
          }}
          helperText="Max Limit is 2,00,000"
        />
      </section>
      <Button className="deduction__option__button" onClick={onSave}>
        Save
      </Button>
    </section>
  );
};
