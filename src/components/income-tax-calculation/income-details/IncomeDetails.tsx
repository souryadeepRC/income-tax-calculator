// components
import { IncomeItem } from "src/components/income-tax-calculation/income-details/income-item/IncomeItem";
// selectors
import {
  selectBasic,
  selectHra,
  selectPf,
  selectSalary,
} from "src/store/income/income-selectors";
// styles
import "./IncomeDetails.scss";

export const IncomeDetails = () => {
  return (
    <section className="income-details__container">
      <IncomeItem
        label="Salary Income"
        type="salary"
        selectAmount={selectSalary}
      />
      <IncomeItem label="Basic" type="basic" selectAmount={selectBasic} />
      <IncomeItem label="HRA" type="hra" selectAmount={selectHra} />
      <IncomeItem label="Provident Fund" type="pf" selectAmount={selectPf} />
    </section>
  );
};
