import { memo, useState } from "react";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./TaxRegimeBreakup.module.scss";
import { TaxChoiceType, TaxScheme } from "src/types/tax-types";
import { Button, Modal } from "../common";
import { useToggle } from "triva-ui";

interface TaxRegimeBreakupProps {
  type: TaxChoiceType;
  details: TaxScheme;
  isBestChoice?: boolean;
}
const TaxRegimeDetails = ({ tax, deduction, taxableAmount }: any) => {
  return (
    <div>
      <div className={classes.tax__breakup}>
        <span>Net Annual Tax: Rs. {formatNumber(tax.yearlyTax)}</span>
        <div className={classes.tax_details}>
          <div>
            <strong>Rs. {formatNumber(tax.baseTax)}</strong>
            <span>Base Tax</span>
          </div>
          <div>
            <strong>Rs. {formatNumber(tax.cessAmount)}</strong>
            <span>CESS</span>
          </div>
        </div>
      </div>
      <div className={classes.source__container}>
        <div>
          <strong>Rs. {formatNumber(taxableAmount)}</strong>
          <span>Taxable Income</span>
        </div>
        <div>
          <strong>Rs. {formatNumber(deduction.total)}</strong>
          <span>Deducted Amount</span>
        </div>
      </div>
    </div>
  );
};
const TaxRegimeBreakup: React.FC<TaxRegimeBreakupProps> = ({
  type,
  details,
  isBestChoice,
}) => {
  const { tax, deduction } = details;
  const [isDetailsVisible, toggleVisibility] = useToggle(false);
  return (
    <div className={classes.regime__container}>
      {isDetailsVisible && (
        <Modal onClose={toggleVisibility}>
          <TaxRegimeDetails
            tax={tax}
            deduction={deduction}
            taxableAmount={details.taxableAmount}
          />
        </Modal>
      )}
      <header>
        <span data-testid="regime-label">{type} Tax Regime</span>
        {isBestChoice && (
          <span className={classes.regime__choice}>Best Choice</span>
        )}
      </header>
      <div className={classes.tax__monthly_amount}>
        <Button variant="text" onClick={toggleVisibility}>
          <>Rs. {formatNumber(tax.monthlyTax)}/month</>
        </Button>
      </div>
      {/*  <div className={classes.tax__breakup}>
        <span>Net Annual Tax: Rs. {formatNumber(tax.yearlyTax)}</span>
        <div className={classes.tax_details}>
          <div>
            <strong>Rs. {formatNumber(tax.baseTax)}</strong>
            <span>Base Tax</span>
          </div>
          <div>
            <strong>Rs. {formatNumber(tax.cessAmount)}</strong>
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
          <strong>Rs. {formatNumber(deduction.total)}</strong>
          <span>Deducted Amount</span>
        </div>
      </div> */}
    </div>
  );
};
export default memo(TaxRegimeBreakup);
