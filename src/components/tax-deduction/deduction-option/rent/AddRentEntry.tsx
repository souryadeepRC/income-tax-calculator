import { memo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
import { Button } from "src/components/common";
//actions
import { editRentEntry } from "src/store/deduction/deduction-actions";
// selectors
import { selectRentEligibleDetails } from "src/store/income/income-selectors";
import { selectRentDeduction } from "src/store/deduction/deduction-selectors";
// types
import { DeductionByRent } from "src/types/deduction-types";
// styles
import classes from "./Rent.module.scss";

const AddRentEntry: React.FC = () => {
  // store
  const dispatch = useDispatch();
  const { deductedAmount }: DeductionByRent = useSelector(selectRentDeduction);
  const { basic, hra } = useSelector(selectRentEligibleDetails);
  const isRentEligible: boolean = basic > 0 && hra > 0;
  const onAddRent = () => {
    dispatch(editRentEntry());
  };
  return (
    <>
      <section
        className={classes.add_rent__container}
        aria-label="add rent option"
      >
        <p>You will get an exemption of Rs.{deductedAmount} from Rent</p>
        {isRentEligible ? (
          <Button
            variant="contained"
            border="round"
            data-testid="add-rent-btn"
            onClick={onAddRent}
          >
            Add Rent
          </Button>
        ) : (
          <span>
            To add rent details, please include the basic salary and HRA
            components of your income.
          </span>
        )}
      </section>
    </>
  );
};
export default memo(AddRentEntry);
