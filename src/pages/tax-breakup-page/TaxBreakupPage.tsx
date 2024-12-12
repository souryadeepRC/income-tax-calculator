import { memo } from "react";
// library
import { useSelector } from "react-redux";
// components
import TaxRegimeBreakup from "src/components/tax-regime-breakup/TaxRegimeBreakup";
// selectors
import { selectTaxDetails } from "src/store/tax/tax-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./TaxBreakupPage.module.scss";

const TaxBreakupPage: React.FC = () => {
  const { choice, newScheme, oldScheme }: any = useSelector(selectTaxDetails);
  const { difference, label } = choice;
  return (
    <main className={classes.tax_breakup__container}>
      <header
        className={classes.tax__message}
        data-testid="tax-breakup-message"
      >
        You can save Rs.<strong>{formatNumber(difference)}</strong>&nbsp;by
        choosing&nbsp;
        <strong>{label} Tax Regime</strong>
      </header>
      <section className={classes.tax_regime__container}>
        <TaxRegimeBreakup
          regimeType="New"
          details={newScheme}
          isBestChoice={label === "New"}
        />
        <TaxRegimeBreakup
          regimeType="Old"
          details={oldScheme}
          isBestChoice={label === "Old"}
        />
      </section>
    </main>
  );
};
export default memo(TaxBreakupPage);
