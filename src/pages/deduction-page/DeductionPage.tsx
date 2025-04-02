// library
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router";
// components
import { AmountLabel } from "src/components/common";
// selectors
import { selectTotalDeduction } from "src/store/deduction/deduction-selectors";
import { selectIsMobile } from "src/store/screen/screen-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./DeductionPage.module.scss";

const DeductionPage: React.FC = () => {
  const { pathname } = useLocation();

  const isNavigationPage: boolean = pathname === "/deduction";
  const isMobile: boolean = useSelector(selectIsMobile);
  const amount: number = useSelector(selectTotalDeduction);
  const showHeader: boolean = !isMobile || (isMobile && isNavigationPage);
  return (
    <>
      {showHeader && (
        <div className={classes.deduction_page__header}>
          <h2>Track Your Deduction with Ease</h2>
          <AmountLabel amount={formatNumber(amount)} />
        </div>
      )}
      <div className={classes.deduction_outlet__container}>
        <Outlet />
      </div>
    </>
  );
};
export default DeductionPage;
