import { memo } from "react";
// library
import { useSelector } from "react-redux";
import {
  NavLink,
  Route,
  Routes
} from "react-router-dom";
// icons
import AddCardIcon from "@mui/icons-material/AddCard";
// components
import { RouteLayout } from "src/components/common/CommonComponents";
// reducers
import {
  selectExtraIncome,
  selectIncomeBreakdown,
  selectSalaryIncome,
} from "src/store/income/income-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import AddIncome from "src/components/add-income/AddIncome";
import IncomeBreakdown from "src/components/income-details/IncomeBreakdown";
import DataLayout from "src/components/layout/DataLayout";
import classes from "./IncomePage.module.scss";
const IncomeOption: React.FC = () => {
  const { salary, extra } = useSelector(selectIncomeBreakdown);

  const options = [
    {
      label: "Add Income",
      path: "add-income",
      startIcon: <AddCardIcon />,
    },
    {
      label: "Salary Income",
      path: "salary",
      amount: `Rs. ${formatNumber(salary)}`,
    },
    {
      label: "Extra Income",
      path: "extra",
      amount: `Rs. ${formatNumber(extra)}`,
    },
  ];
  return (
    <section className={classes.income__options_container}>
      {options.map((incomeOption) => {
        return (
          <NavLink to={incomeOption.path}>
            <div className={classes.income__option}>
              {incomeOption.startIcon && <>{incomeOption.startIcon}</>}
              <span>{incomeOption.label}</span>
              {incomeOption.amount && <strong>{incomeOption.amount}</strong>}
            </div>
          </NavLink>
        );
      })}
    </section>
  );
};

const IncomePage: React.FC = () => {
  const { salary, extra, total } = useSelector(selectIncomeBreakdown);
  return (
    <DataLayout
      headerText="Annual Income"
      aggregateAmount={formatNumber(total)}
    >
      <Routes>
        <Route path="" element={<IncomeOption />} />
        <Route
          path="add-income"
          element={
            <RouteLayout parentPath="income" label="Add a New Income Source">
              <AddIncome />
            </RouteLayout>
          }
        />
        <Route
          path="salary"
          element={
            <RouteLayout
              parentPath="income"
              label={`Salary Income Rs. ${salary}`}
            >
              <IncomeBreakdown
                group="salary"
                dataSelector={selectSalaryIncome}
              />
            </RouteLayout>
          }
        />
        <Route
          path="extra"
          element={
            <RouteLayout
              parentPath="income"
              label={`Extra Income Rs. ${extra}`}
            >
              <IncomeBreakdown group="extra" dataSelector={selectExtraIncome} />
            </RouteLayout>
          }
        />
      </Routes>
    </DataLayout>
  );
};
export default memo(IncomePage);
