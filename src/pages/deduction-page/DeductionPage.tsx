import { memo } from "react";
// library
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
// components
import { RouteLayout } from "src/components/common";
// selectors
import { selectDeductionBreakup } from "src/store/deduction/deduction-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./DeductionPage.module.scss";

const DeductionPage: React.FC = () => {
  const deductionBreakup = useSelector(selectDeductionBreakup);
  return (
    <>
      <div className={classes.deduction_page__container}>
        <strong data-testid="layout-header">Overall Exempted Deduction</strong>
        <strong data-testid="layout-amount">
          Rs. {formatNumber(deductionBreakup.total)}
        </strong>
      </div>
      <RouteLayout parentPath="deduction" label="">
        <Outlet />
      </RouteLayout>
    </>
  );
};
export default memo(DeductionPage);
