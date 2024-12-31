import { memo } from "react";
// library
import { useSelector } from "react-redux";
// components
import BreakdownComponent from "./BreakdownComponent";
// types
import { IncomeOption } from "src/types/income-types";
// utils
import { calculateOverallAmount } from "src/utils/income-utils";
// styles
import classes from "./IncomeBreakdown.module.scss";
import { formatNumber } from "src/utils/tax-calculation";
interface IncomeBreakdownProps {
  group: "salary" | "extra";
  dataSelector: any;
}

const IncomeBreakdown: React.FC<IncomeBreakdownProps> = ({
  group,
  dataSelector,
}) => {
  const breakdownIncomes: IncomeOption[] = useSelector(dataSelector);
  const overallAmount = calculateOverallAmount(breakdownIncomes);
  return (
    <section className={classes.income_breakdown_container}>
      <header className={classes.income_breakdown_header}>
        <span>{group} Income</span>
        <span>Rs.{formatNumber(overallAmount)}</span>
      </header>
      <section className={classes.income_component_container}>
        {breakdownIncomes.map((income: IncomeOption) => {
          return (
            <BreakdownComponent
              key={income.label}
              id={income.id || ""}
              category={group}
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
