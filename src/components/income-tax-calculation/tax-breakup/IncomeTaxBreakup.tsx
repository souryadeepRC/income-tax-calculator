import { useSelector } from "react-redux";
// selectors
import { selectTaxDetails } from "src/store/income/income-selectors";
// styles
import "./IncomeTaxBreakup.scss";

const Breakup = ({ type, details, differenceType }: any) => {
  const isBestChoice: boolean = differenceType === type;
  return (
    <section className={`breakup-details ${isBestChoice && "best-choice"}`}>
      <h4>Tax Regime : {type}</h4>
      <span>
        <strong>Net Taxable Income : </strong>
        {details.taxableAmount}
      </span>
      <span>
        <strong>Deducted Amount : </strong>
        {details.deductedAmount}
      </span>
      <hr />
      <span>
        <strong>Base Tax : </strong>
        {details.baseTax} &nbsp;
        <strong>CESS : </strong>
        {details.cessAmount}
      </span> 
      <hr />
      <span>
        <strong>Total Tax : </strong>
        Rs.{details.yearlyTax}
      </span>
      <span>
        <strong>Monthly Tax : </strong> Rs.
        {details.monthlyTax.toFixed(2)} / month
      </span>
    </section>
  );
};
export const IncomeTaxBreakup = () => {
  // store
  const { difference, newScheme, oldScheme }: any =
    useSelector(selectTaxDetails);

  return (
    <section>
      <section className="tax-breakup-message">
        You will save Rs. {difference.amount.toFixed(2)} by choosing&nbsp;
        {difference.type} Tax Regime
      </section>

      <div className="tax-breakup__container">
        <Breakup
          differenceType={difference.type}
          type="New"
          details={newScheme}
        />
        <Breakup
          differenceType={difference.type}
          type="Old"
          details={oldScheme}
        />
      </div>
    </section>
  );
};
