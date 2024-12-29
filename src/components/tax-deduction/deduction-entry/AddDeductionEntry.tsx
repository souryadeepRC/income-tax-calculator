import { memo } from "react";
// library
import { Button } from "@mui/material";
// styles
import classes from "./DeductionEntry.module.scss";

interface AddDeductionEntryProps {
  deductedAmount: number;
  deductionSection: string;
  onAddDeduction: () => void;
}
const AddDeductionEntry: React.FC<AddDeductionEntryProps> = ({
  deductedAmount,
  deductionSection,
  onAddDeduction,
}) => {
  return (
    <section className={classes.add_deduction__container}>
      <span>
        You will get an exemption of Rs.{deductedAmount} from {deductionSection}
      </span>
      <Button variant="contained" data-testid="add-deduction-btn" onClick={onAddDeduction}>
        Add Deduction
      </Button>
    </section>
  );
};
export default memo(AddDeductionEntry);
