import { memo, useState, useEffect } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
import { TUITextField } from "triva-ui";
// components
import { Button } from "src/components/common";
// actions
import { updateSection24Deduction } from "src/store/deduction/deduction-actions";
// selectors
import { selectDeductionSection24 } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/types/store-types";
import { DeductionSection24 } from "src/types/deduction-types";
// constants
import { NUMERIC_REGEX } from "src/constants/common-constants";
// styles
import classes from "../IncomeTaxDeduction.module.scss";
import { formatNumber } from "src/utils/tax-calculation";
const Section24 = () => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const { amount, deductedAmount }: DeductionSection24 = useSelector(
    selectDeductionSection24
  );
  const [entryInput, setEntryInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (!amount) return;
    setEntryInput(`${amount}`);
  }, [amount]);

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredAmount: string = event.target.value;
    setEntryInput(enteredAmount);
    let errorMessage = "";
    if (!NUMERIC_REGEX.test(enteredAmount)) {
      errorMessage = "Enter a valid amount more than 0 (e.g. 100.50 or 100)";
    }
    setError(errorMessage);
  };
  const onSave = () => {
    dispatch(updateSection24Deduction(+entryInput));
  };
  return (
    <section className={classes.deduction__container}>
      <header>
        You will get an exemption of Rs.{formatNumber(deductedAmount)} from
        Section 24
      </header>
      <form className={classes.deduction_form__container}>
        <TUITextField
          fullWidth
          label="Section 24 - Home Loan Interest"
          value={entryInput}
          onChange={onAmountChange}
          type="number"
          inputProps={{ "data-testid": "section24-input" }}
          errorMessage={error}
        />
        <Button variant="contained" border="round" onClick={onSave}>
          Save
        </Button>
      </form>
    </section>
  );
};

export default memo(Section24);
