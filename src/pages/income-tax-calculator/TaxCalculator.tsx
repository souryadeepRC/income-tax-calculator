// component
import { IncomeDetails } from "src/components/income-tax-calculation/income-details/IncomeDetails";
import { IncomeTaxBreakup } from "src/components/income-tax-calculation/income-tax-breakup/IncomeTaxBreakup";
import { IncomeTaxDeduction } from "src/components/income-tax-calculation/income-tax-deduction/IncomeTaxDeduction";
// styles
import "./TaxCalculator.scss";
export const TaxCalculator = () => {
  return (
    <section className="tax-section">
      <IncomeDetails />
      <IncomeTaxBreakup />
      <IncomeTaxDeduction />
    </section>
  );
};
