import { memo } from "react";
// library
import { useSelector } from "react-redux";
// components
import BreakdownComponent from "./BreakdownComponent";
// types
import { IncomeComponent } from "src/types/income-types";
// utils
import { getIncomeBreakdown } from "src/utils/income-utils";
// styles
import classes from "./IncomeBreakdown.module.scss";
interface IncomeBreakdownProps {
  group: "salary" | "extra";
  amount: number;
  dataSelector: any;
}

const IncomeBreakdown: React.FC<IncomeBreakdownProps> = ({
  group,
  amount,
  dataSelector,
}) => {
  const breakdownIncomes = getIncomeBreakdown(group, useSelector(dataSelector));

  return (
    <section className={classes.income_breakdown_container}>
      <header className={classes.income_breakdown_header}>
        <span>{group} Income</span>
        <span>Rs.{amount}</span>
      </header>
      <section className={classes.income_component_container}>
        {breakdownIncomes.map((income: IncomeComponent) => {
          return (
            <BreakdownComponent
              key={income.label}
              group={group}
              label={income.label}
              amount={income.amount}
            />
          );
        })}
      </section>
    </section>
  );
};
export default memo(IncomeBreakdown);
