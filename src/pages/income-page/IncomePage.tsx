import { memo } from "react";
// library
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// icons
import AddCardIcon from "@mui/icons-material/AddCard";
// components
import { Modal } from "src/components/common/CommonComponents";
import IncomeBreakdown from "src/components/income-details/IncomeBreakdown";
import AddIncome from "src/components/add-income/AddIncome";
// reducers
import {
  editIncomeEntry,
  resetEditIncomeEntry,
} from "src/store/income/income-actions";
import {
  selectExtraIncome,
  selectIncome,
  selectSalaryIncome,
} from "src/store/income/income-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./IncomePage.module.scss";

const IncomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { overallAmount, isEditable } = useSelector(selectIncome);
  const handleEditIncomeReset = () => {
    dispatch(resetEditIncomeEntry());
  };
  return (
    <>
      {isEditable && (
        <Modal isOpen={true} onClose={handleEditIncomeReset}>
          <AddIncome onCancel={handleEditIncomeReset} />
        </Modal>
      )}
      <main className={classes.income__container}>
        <header className={classes.add_income__header}>
          <Box display="flex" flexDirection="column">
            <strong>Annual Income</strong>
            <span>Rs.&nbsp;{formatNumber(overallAmount)}</span>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddCardIcon />}
            onClick={() => dispatch(editIncomeEntry())}
          >
            Add Income
          </Button>
        </header>
        <section className={classes.income_option_container}>
          <aside>
            <IncomeBreakdown group="salary" dataSelector={selectSalaryIncome} />
          </aside>
          <aside>
            <IncomeBreakdown group="extra" dataSelector={selectExtraIncome} />
          </aside>
        </section>
      </main>
    </>
  );
};
export default memo(IncomePage);
