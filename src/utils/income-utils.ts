import { IncomeComponent } from "src/types/income-types";

export const getIncomeBreakdown = (
  group: "salary" | "extra",
  incomeDetails: Record<string, number>
): IncomeComponent[] => {
  return Object.keys(incomeDetails).reduce(
    (acc: IncomeComponent[], incomeType: string) => {
      acc.push({
        label: incomeType,
        amount: `${incomeDetails[incomeType]}`,
        group,
      });
      return acc;
    },
    []
  );
};
