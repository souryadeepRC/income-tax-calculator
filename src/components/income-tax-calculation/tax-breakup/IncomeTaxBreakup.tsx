import { useSelector } from "react-redux";
// selectors
import { selectTaxDetails } from "src/store/income/income-selectors";
// styles
import { formatNumber } from "src/utils/tax-calculation";
import "./IncomeTaxBreakup.scss";

const Breakup = ({ type, details, differenceType }: any) => {
  const isBestChoice: boolean = differenceType === type;
  return (
    <section className={`breakup-details ${isBestChoice && "best-choice"}`}>
      <h4>Tax Regime : {type}</h4>
      <span>
        <strong>Net Taxable Income : </strong>
        {formatNumber(details.taxableAmount)}
      </span>
      <span>
        <strong>Deducted Amount : </strong>
        {formatNumber(details.deductedAmount)}
      </span>
      <hr />
      <span>
        <strong>Base Tax : </strong>
        {formatNumber(details.baseTax)} &nbsp;
        <strong>CESS : </strong>
        {formatNumber(details.cessAmount)}
      </span>
      <hr />
      <span>
        <strong>Total Tax : </strong>
        Rs.{formatNumber(details.yearlyTax)}
      </span>
      <span>
        <strong>Monthly Tax : </strong> Rs.
        {formatNumber(details.monthlyTax)} / month
      </span>
    </section>
  );
};
export const IncomeTaxBreakup = () => {
  // store
  const { choice, newScheme, oldScheme }: any = useSelector(selectTaxDetails);
  const { difference, type } = choice;
  return (
    <section>
      <section className="tax-breakup-message">
        You will save Rs. {difference.toFixed(2)} by choosing&nbsp;
        {type} Tax Regime
      </section>

      <div className="tax-breakup__container">
        <Breakup differenceType={type} type="New" details={newScheme} />
        <Breakup differenceType={type} type="Old" details={oldScheme} />
      </div>
    </section>
  );
};
