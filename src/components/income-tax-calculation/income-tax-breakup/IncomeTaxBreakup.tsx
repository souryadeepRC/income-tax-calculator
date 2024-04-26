// components
import { useSelector } from "react-redux";
import { selectPf, selectSalary } from "src/store/income/income-selectors";
import { calculateTax } from "src/utils/tax-calculation";
// styles
import "./IncomeTaxBreakup.scss";

export const IncomeTaxBreakup = () => {
  const salary: number = useSelector(selectSalary);
  const pf: number = useSelector(selectPf);
  const tax: any = calculateTax(salary - pf, {
    "Standard Deduction": 50000,
  }); 

  return (
    <div className="breakup__container">
      <section className="tax-details">
        {tax.difference.type === "New" && (
          <span className="best-choice-regime">Best</span>
        )}
        <span className="regime-type">New Regime</span>
        <span className="tax-amount">
          Rs. {tax.newScheme.yearlyTax.toFixed(2)} (Rs.{" "}
          {tax.newScheme.monthlyTax.toFixed(2)}/month)
        </span>
      </section>
      <section className="tax-details">
        {tax.difference.type === "Old" && (
          <span className="best-choice-regime">Best</span>
        )}
        <span className="regime-type">Old Regime</span>
        <span className="tax-amount">
          Rs. {tax.oldScheme.yearlyTax.toFixed(2)} (Rs.{" "}
          {tax.oldScheme.monthlyTax.toFixed(2)}/month)
        </span>
      </section>
    </div>
  );
};
