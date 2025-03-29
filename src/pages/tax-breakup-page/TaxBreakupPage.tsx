// components
import TaxRegimeBreakup from "src/components/tax-regime-breakup/TaxRegimeBreakup";
// hooks
import { useTaxCalculation } from "src/hooks";
// types
import { TaxBreakup } from "src/types/tax-types";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// constants
import { TAX_SCHEME } from "src/constants/tax-constants";
// styles
import classes from "./TaxBreakupPage.module.scss";

const TaxBreakupPage: React.FC = () => {
  const taxDetails: TaxBreakup = useTaxCalculation();
  const { difference, type } = taxDetails.choice;

  return (
    <div className={classes.tax_breakup__container}>
      <div
        className={classes.tax__message}
        data-testid="tax-breakup-message"
      >
        You can save Rs.<strong>{formatNumber(difference)}</strong>&nbsp;by
        choosing&nbsp;
        <strong>{type} Tax Regime</strong>
      </div>
      <section className={classes.tax_regime__container}>
        <TaxRegimeBreakup
          type={TAX_SCHEME.NEW}
          details={taxDetails.new}
          isBestChoice={type === TAX_SCHEME.NEW}
        />
        <TaxRegimeBreakup
          type={TAX_SCHEME.OLD}
          details={taxDetails.old}
          isBestChoice={type === TAX_SCHEME.OLD}
        />
      </section>
    </div>
  );
};
export default TaxBreakupPage;
