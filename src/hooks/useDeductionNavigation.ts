import { useMemo } from "react";
import { useSelector } from "react-redux";
// store
import { selectDeductionAmountBreakup } from "src/store/deduction/deduction-selectors";
// types
import { DeductionAmountBreakup } from "src/types/deduction-types";

type NavigationDetails = {
  key: string;
  title: string;
  path: string;
};
type DeductionNavigationType = NavigationDetails & {
  amount: number;
};

const DEDUCTION_NAVIGATIONS: NavigationDetails[] = [
  { key: "rent", title: "Rent", path: "/deduction/rent" },
  { key: "section24", title: "Section 24", path: "/deduction/section-24" },
  { key: "section80C", title: "Section 80C", path: "/deduction/section-80C" },
  { key: "chapter6", title: "Chapter VIA", path: "/deduction/chapter-VIA" },
  { key: "others", title: "Others", path: "/deduction/others" },
];

const useDeductionNavigation = (): DeductionNavigationType[] => {
  const deductionAmounts: DeductionAmountBreakup = useSelector(
    selectDeductionAmountBreakup
  );

  const deductionNavigations: any = useMemo(() => {
    return DEDUCTION_NAVIGATIONS.map((navigation: NavigationDetails) => ({
      ...navigation,
      amount: deductionAmounts[navigation.key],
    }));
  }, [deductionAmounts]);

  return deductionNavigations;
};

export default useDeductionNavigation;
