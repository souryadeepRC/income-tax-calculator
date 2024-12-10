import { memo } from "react";
// library
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";
// icons
import AddCardIcon from "@mui/icons-material/AddCard";
// components
import { RouteLayout } from "src/components/common/CommonComponents";
import DataLayout from "src/components/layout/DataLayout";
// reducers
import { selectIncomeBreakdown } from "src/store/income/income-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./IncomePage.module.scss";
export const IncomeOption: React.FC = () => {
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
  const { total } = useSelector(selectIncomeBreakdown);
  return (
    <DataLayout
      headerText="Annual Income"
      aggregateAmount={formatNumber(total)}
    >
      <RouteLayout parentPath="income" label="">
        <Outlet />
      </RouteLayout>
    </DataLayout>
  );
};
export default memo(IncomePage);
