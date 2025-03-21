import { memo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import { DeductionHeader } from "src/components/tax-deduction";
//actions
import { editDeduction } from "src/store/deduction/deduction-actions";
// selectors
import { selectRentEligibleDetails } from "src/store/income/income-selectors";
import { selectRentDeduction } from "src/store/deduction/deduction-selectors";
// constants
import { DEDUCTION_TYPE } from "src/constants/common-constants";
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

  return (
    <>
      <DeductionHeader
        title="Rent"
        amount={deductedAmount}
        addAction={
          !isRentEligible
            ? () => {
                dispatch(editDeduction({ type: DEDUCTION_TYPE.RENT }));
              }
            : undefined
        }
      />

      {!isRentEligible && (
        <span>
          To add rent details, please include the basic salary and HRA
          components of your income.
        </span>
      )}
    </>
  );
};
export default memo(AddRentEntry);
