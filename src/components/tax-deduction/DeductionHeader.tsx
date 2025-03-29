// library
import { useSelector } from "react-redux";
import AddCardIcon from "@mui/icons-material/Tune";
// components
import { Button } from "src/components/common";
// store
import { selectIsMobile } from "src/store/screen/screen-selectors";
// styles
import classes from "./TaxDeduction.module.scss";

interface DeductionHeaderProps {
  title: string;
  amount: number;
  addAction?: () => void;
}
const DeductionHeader: React.FC<DeductionHeaderProps> = ({
  title,
  amount,
  addAction,
}) => {
  const isMobile: boolean = useSelector(selectIsMobile);
  return (
    <section className={classes.deduction_header__container}>
      <div>
        <h2 className={classes.deduction__title}>{title}</h2>
        <p className={classes.deduction__amount}>Exempted : Rs. {amount}</p>
      </div>

      {addAction && (
        <Button
          variant="contained"
          border="round"
          data-testid="add-deduction-btn"
          onClick={addAction}
          startIcon={<AddCardIcon />}
        >
          Add
        </Button>
      )}
    </section>
  );
};
export default DeductionHeader;
