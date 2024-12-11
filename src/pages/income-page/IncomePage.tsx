import { memo, useState } from "react";
// library
import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
// icons
import AddCardIcon from "@mui/icons-material/AddCard";
// components
import { Modal } from "src/components/common/CommonComponents";
import IncomeBreakdown from "src/components/income-details/IncomeBreakdown";
import AddIncome from "src/components/add-income/AddIncome";
// reducers
import {
  selectExtraIncome,
  selectIncomeBreakdown,
  selectSalaryIncome,
} from "src/store/income/income-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./IncomePage.module.scss";

const IncomePage: React.FC = () => {
  const { salary, extra, total } = useSelector(selectIncomeBreakdown);
  const [isAddIncome, setIsAddIncome] = useState(false);

  return (
    <>
      {isAddIncome && (
        <Modal isOpen={isAddIncome} onClose={() => setIsAddIncome(false)}>
          <AddIncome onCancel={() => setIsAddIncome(false)} />
        </Modal>
      )}
      <main className={classes.income__container}>
        <header className={classes.add_income__header}>
          <Box display="flex" flexDirection="column">
            <strong>Annual Income</strong>
            <span>Rs.&nbsp;{formatNumber(total)}</span>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddCardIcon />}
            onClick={() => setIsAddIncome(true)}
          >
            Add Income
          </Button>
        </header>
        <section className={classes.income_option_container}>
          <aside>
            <IncomeBreakdown
              group="salary"
              amount={salary}
              dataSelector={selectSalaryIncome}
            />
          </aside>
          <aside>
            <IncomeBreakdown
              group="extra"
              amount={extra}
              dataSelector={selectExtraIncome}
            />
          </aside>
        </section>
      </main>
    </>
  );
};
export default memo(IncomePage);
