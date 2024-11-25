import { memo } from "react";
// library
import { useSelector } from "react-redux";
// components
import AddIncome from "src/components/add-income/AddIncome";
import IncomeDetails from "src/components/income-details/IncomeDetails";
// reducers
import { selectAnnualIncome } from "src/store/income/income-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import { Box } from "@mui/material";
import classes from "./IncomePage.module.scss";

const IncomePage: React.FC = () => {
  const annualIncome = useSelector(selectAnnualIncome);
  return (
    <section className={classes.income__container}>
      <section className={classes.income__header}>
        <strong>Annual Income</strong>
        <strong>Rs. {formatNumber(annualIncome)}</strong>
      </section>
      <Box display="flex" gap="1">
        <AddIncome />
        <IncomeDetails />
      </Box>
    </section>
  );
};
export default memo(IncomePage);
