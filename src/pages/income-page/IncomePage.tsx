import { memo } from "react";
// library
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import classes from "./IncomePage.module.scss";
const IncomeOption: React.FC = () => {
  const { salary, extra, total } = useSelector(selectIncomeBreakdown);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <section className={classes.income__options_container}>
      <div onClick={() => navigate(location.pathname + "/add-income")}>
        <AddCardIcon />
        Add Income
      </div>
      <div onClick={() => navigate(location.pathname + "/salary")}>
        <span>Salary Income</span>
        <strong>Rs. {formatNumber(salary)}</strong>
      </div>
      <div onClick={() => navigate(location.pathname + "/extra")}>
        <span>Extra Income</span>
        <strong>Rs. {formatNumber(extra)}</strong>
      </div>
    </section>
  );
};

const IncomePage: React.FC = () => {
  const { salary, extra, total } = useSelector(selectIncomeBreakdown);
  return (
    <section className={classes.income__container}>
      <section className={classes.income__header}>
        <strong>Annual Income</strong>
        <strong>Rs. {formatNumber(total)}</strong>
      </section>
      <Routes>
        <Route path="" element={<IncomeOption />} />
        <Route
          path="add-income"
          element={
            <RouteLayout label="Add a New Income Source">
              <AddIncome />
            </RouteLayout>
          }
        />
        <Route
          path="salary"
          element={
            <RouteLayout label={`Salary Income Rs. ${salary}`}>
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
            <RouteLayout label={`Extra Income Rs. ${extra}`}>
              <IncomeBreakdown group="extra" dataSelector={selectExtraIncome} />
            </RouteLayout>
          }
        />
      </Routes>
    </section>
  );
};
export default memo(IncomePage);
