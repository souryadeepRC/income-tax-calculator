// library
import AddCardIcon from "@mui/icons-material/DataSaverOn";
import { useDispatch, useSelector } from "react-redux";
// components
import { AmountLabel, Button } from "src/components/common";
// store
import { selectOverallIncomeAmount } from "src/store/income/income-selectors";
import { editIncomeEntry } from "src/store/income/income-actions";
import { selectIsMobile } from "src/store/screen/screen-selectors";
// styles
import classes from "./IncomeDetails.module.scss";

const IncomeHeader: React.FC = () => {
  const dispatch = useDispatch();
  const isMobile: boolean = useSelector(selectIsMobile);
  const totalIncome = useSelector(selectOverallIncomeAmount);
  const addIncome = () => {
    dispatch(editIncomeEntry());
  };
  return (
    <section className={classes.income_header__container}>
      <div className={classes.header__actions}>
        {!isMobile && (
          <h2 className={classes.header__title}>Track Your Income with Ease</h2>
        )}

        <Button
          variant="contained"
          border="round"
          label="add-income"
          startIcon={<AddCardIcon />}
          onClick={addIncome}
        >
          Add Income
        </Button>
      </div>
      <AmountLabel amount={`${totalIncome}`} />
    </section>
  );
};
export default IncomeHeader;
