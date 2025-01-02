import { memo } from "react";
// library
import { useSelector } from "react-redux";
// components
import TaxRegimeBreakup from "src/components/tax-regime-breakup/TaxRegimeBreakup";
// selectors
import { selectTaxDetails } from "src/store/tax/tax-selectors";
// types
import { TaxReducerType } from "src/types/tax-types";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./TaxBreakupPage.module.scss";

const TaxBreakupPage: React.FC = () => {
  const { choice, newScheme, oldScheme }: TaxReducerType =
    useSelector(selectTaxDetails);
  const { difference, type } = choice;
  return (
    <main className={classes.tax_breakup__container}>
      <header
        className={classes.tax__message}
        data-testid="tax-breakup-message"
      >
        You can save Rs.<strong>{formatNumber(difference)}</strong>&nbsp;by
        choosing&nbsp;
        <strong>{type} Tax Regime</strong>
      </header>
      <section className={classes.tax_regime__container}>
        <TaxRegimeBreakup
          regimeType="New"
          details={newScheme}
          isBestChoice={type === "New"}
        />
        <TaxRegimeBreakup
          regimeType="Old"
          details={oldScheme}
          isBestChoice={type === "Old"}
        />
      </section>
    </main>
  );
};
export default memo(TaxBreakupPage);
