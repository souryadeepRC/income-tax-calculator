// library
import { useSelector } from "react-redux";
import AddCardIcon from "@mui/icons-material/Tune";
// components
import { BackButton, Button } from "src/components/common";
// store
import { selectIsMobile } from "src/store/screen/screen-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./TaxDeduction.module.scss";

interface DeductionHeaderProps {
  title: string;
  amount: number;
  addAction?: () => void;
  actionText?: string;
  note?: string;
}
const DeductionHeader: React.FC<DeductionHeaderProps> = ({
  title,
  amount,
  addAction,
  actionText = "Add",
  note,
}) => {
  const isMobile: boolean = useSelector(selectIsMobile);
  return (
    <>
      <BackButton />
      <section className={classes.deduction_header__container}>
        <div className={classes.deduction_data}>
          <h2 className={classes.deduction__title}>{title}</h2>
          <p className={classes.deduction__amount}>
            Exempted : Rs. {formatNumber(amount)}
          </p>
        </div>

        {addAction && (
          <Button
            variant="contained"
            border="round"
            data-testid="add-deduction-btn"
            onClick={addAction}
          >
            {actionText}
          </Button>
        )}
        {note && (
          <span className={classes.deduction_note}>
            Note&nbsp;:&nbsp;{note}
          </span>
        )}
      </section>
    </>
  );
};
export default DeductionHeader;
