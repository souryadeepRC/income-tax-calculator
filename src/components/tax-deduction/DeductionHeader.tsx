// library
import { useSelector } from "react-redux";
import AddCardIcon from "@mui/icons-material/AddCard";
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
        <h2>{title}</h2>
        <p>Total Exempted : Rs. {amount}</p>
      </div>

      {addAction && (
        <Button
          variant="contained"
          border="round"
          data-testid="add-deduction-btn"
          onClick={addAction}
          startIcon={<AddCardIcon />}
        >
          {isMobile ? "Add" : "New Deduction"}
        </Button>
      )}
    </section>
  );
};
export default DeductionHeader;
