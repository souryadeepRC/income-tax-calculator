import { useSelector } from "react-redux";
// selectors
import { selectTaxDetails } from "src/store/income/income-selectors";
// styles
import { formatNumber } from "src/utils/tax-calculation";
import "./TaxDetails.scss";
const TaxDetail = ({ differenceType, type, details }: any) => {
  return (
    <section className="tax-details">
      {differenceType === type && (
        <span className="best-choice-regime">Best</span>
      )}
      <span className="regime-type">{type} Regime</span>
      <span className="tax-amount">
        Rs. {formatNumber(details.yearlyTax)} (Rs.&nbsp;
        {formatNumber(details.monthlyTax)}/month)
      </span>
    </section>
  );
};
export const TaxDetails = () => {
  // store
  const { newScheme, oldScheme, difference }: any =
    useSelector(selectTaxDetails);

  return (
    <div className="breakup__container">
      <TaxDetail
        type="New"
        differenceType={difference.type}
        details={newScheme}
      />
      <TaxDetail
        type="Old"
        differenceType={difference.type}
        details={oldScheme}
      />
    </div>
  );
};
