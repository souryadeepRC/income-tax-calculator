import { Button } from "src/components/common";
// icons
import AddCardIcon from "@mui/icons-material/AddCard";
import classes from "./IncomeDetails.module.scss";
import { selectOverallIncomeAmount } from "src/store/income/income-selectors";
import { useDispatch, useSelector } from "react-redux";
import { editIncomeEntry } from "src/store/income/income-actions";

const IncomeHeader: React.FC = () => {
  const dispatch = useDispatch();
  const totalIncome = useSelector(selectOverallIncomeAmount);
  const addIncome = () => {
    dispatch(editIncomeEntry());
  };
  return (
    <section className={classes.income_header__container}>
      <h2>Track Your Income with Ease</h2>
      <div className={classes.header__actions}>
        <div className={classes.income_amount__label}>
          <span>Rs.</span>
          <span>{totalIncome}</span>
        </div>
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
    </section>
  );
};
export default IncomeHeader;
