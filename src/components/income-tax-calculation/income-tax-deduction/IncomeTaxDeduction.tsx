// styles
import "./IncomeTaxDeduction.scss";

export const IncomeTaxDeduction = () => {
  return (
    <section className="deduction__container">
      <header>Deductions</header>
      <ul className="deduction-list">
        <li>Rent</li>
        <li>Section 24</li>
        <li>80C</li>
        <li>Chapter VIA</li>
      </ul>
    </section>
  );
};
