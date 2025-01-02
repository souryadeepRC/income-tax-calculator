import { memo } from "react";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./TaxRegimeBreakup.module.scss";
import { TaxScheme } from "src/types/tax-types";

interface TaxRegimeBreakupProps {
  regimeType: string;
  details: TaxScheme;
  isBestChoice?: boolean;
}
const TaxRegimeBreakup: React.FC<TaxRegimeBreakupProps> = ({
  regimeType,
  details,
  isBestChoice,
}) => (
  <main className={classes.regime__container}>
    <header>
      <span data-testid="regime-label">{regimeType} Tax Regime</span>
      {isBestChoice && (
        <span className={classes.regime__choice}>Best Choice</span>
      )}
    </header>
    <div className={classes.tax__monthly_amount}>
      Rs. {formatNumber(details.monthlyTax)}/month
    </div>
    <div className={classes.tax__breakup}>
      <span>Net Annual Tax: Rs. {formatNumber(details.yearlyTax)}</span>
      <div className={classes.tax_details}>
        <div>
          <strong>Rs. {formatNumber(details.baseTax)}</strong>
          <span>Base Tax</span>
        </div>
        <div>
          <strong>Rs. {formatNumber(details.cessAmount)}</strong>
          <span>CESS</span>
        </div>
      </div>
    </div>
    <div className={classes.source__container}>
      <div>
        <strong>Rs. {formatNumber(details.taxableAmount)}</strong>
        <span>Taxable Income</span>
      </div>
      <div>
        <strong>Rs. {formatNumber(details.deductedAmount)}</strong>
        <span>Deducted Amount</span>
      </div>
    </div>
  </main>
);
export default memo(TaxRegimeBreakup);
