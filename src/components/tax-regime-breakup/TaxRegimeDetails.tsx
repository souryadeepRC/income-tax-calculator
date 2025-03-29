// components
import { ToggleView } from "src/components/common";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// types
import { TaxScheme } from "src/types/tax-types";
// styles
import classes from "./TaxRegimeBreakup.module.scss";

interface BreakupItemProps {
  label: string;
  amount: number;
}

const BreakupItem: React.FC<BreakupItemProps> = ({ label, amount }) => {
  return (
    <div className={classes.breakup__item}>
      <span>{label}</span>
      <strong>Rs. {formatNumber(amount)}</strong>
    </div>
  );
};

interface TaxRegimeDetailsProps {
  details: TaxScheme;
}
const TaxRegimeDetails: React.FC<TaxRegimeDetailsProps> = ({ details }) => {
  const { tax, deduction, taxableAmount } = details || {};
  return (
    <div className={classes.tax__breakup}>
      <ToggleView header="Tax">
        <BreakupItem label="Annual Tax" amount={tax.yearlyTax} />
        <BreakupItem label="Base Tax" amount={tax.baseTax} />
        <BreakupItem label="CESS" amount={tax.cessAmount} />
      </ToggleView>
      <ToggleView header="Income">
        <BreakupItem label="Taxable Income" amount={taxableAmount} />
      </ToggleView>
      <ToggleView header="Deduction">
        <BreakupItem label="Total deduction" amount={deduction.total} />
        <BreakupItem label="Standard deduction" amount={deduction.standard} />
        <BreakupItem label="Other deduction" amount={deduction.other} />
      </ToggleView>
    </div>
  );
};
export default TaxRegimeDetails;
