import { memo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import { Button } from "src/components/common/CommonComponents";
//actions
import { editRentEntry } from "src/store/deduction/deduction-actions";
// selectors
import { selectIsRentEligible } from "src/store/income/income-selectors";
// styles
import classes from "./Rent.module.scss";

const AddRentEntry: React.FC = () => {
  // store
  const dispatch = useDispatch();
  const isRentEligible: boolean = useSelector(selectIsRentEligible);
  const onAddRent = () => {
    dispatch(editRentEntry());
  };
  return (
    <>
      <section aria-label="add rent option">
        {isRentEligible ? (
          <Button className={classes.add_rent__btn} onClick={onAddRent}>
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
