import { memo } from "react";
// library
import { Button } from "src/components/common";
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
}) => (
  <section className={classes.add_deduction__container}>
    <p>
      You will get an exemption of Rs.{deductedAmount} from {deductionSection}
    </p>
    <Button
      variant="contained"
      border="round"
      data-testid="add-deduction-btn"
      onClick={onAddDeduction}
    >
      Add Deduction
    </Button>
  </section>
);
export default memo(AddDeductionEntry);
