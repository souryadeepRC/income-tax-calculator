import { memo } from "react";
// library
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
// components
import DeductionNavigation from "./DeductionNavigation";
// selectors
import { selectTotalDeduction } from "src/store/deduction/deduction-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./DeductionPage.module.scss";

const DeductionPage: React.FC = () => {
  const amount: number = useSelector(selectTotalDeduction);

  return (
    <>
      <section className={classes.deduction_page__container}>
        <div className={classes.deduction_page__header}>
          <h2>Track Your Deduction with Ease</h2>
          <div className={classes.deduction_amount__label}>
            <span>Rs.</span>
            <span>{formatNumber(amount)}</span>
          </div>
        </div>
        <DeductionNavigation />
      </section>
      <div className={classes.deduction_outlet__container}>
        <Outlet />
      </div>
    </>
  );
};
export default DeductionPage;
