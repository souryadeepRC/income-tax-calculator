import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRentDeductedAmount } from "src/store/deduction/deduction-actions";
import { selectRentCollections } from "src/store/deduction/deduction-selectors";
import { selectRentEligibleDetails } from "src/store/income/income-selectors";
import { RentEntry } from "src/types/deduction-types";
import { calculateRentDeduction } from "src/utils/tax-calculation";

const useRentExemption = () => {
  const dispatch = useDispatch();
  const collections = useSelector(selectRentCollections);
  const { basic, hra } = useSelector(selectRentEligibleDetails);
  const calculateRentDeductedAmount = (
    rentCollections: RentEntry[],
    basic: number,
    hra: number,
  ) => {
    const rentBreakup = rentCollections.reduce(
      (acc: any, rentEntry: RentEntry) => {
        const { amount, duration, isMetroCity } = rentEntry;
        const field = isMetroCity ? "metro" : "nonMetro";
        return {
          ...acc,
          [field]: {
            duration: acc?.[field].duration + duration,
            amount: acc?.[field].amount + amount,
          },
        };
      },
      {
        metro: { duration: 0, amount: 0 },
        nonMetro: { duration: 0, amount: 0 },
      },
    );

    const metroExemption = calculateRentDeduction(
      rentBreakup.metro.amount,
      rentBreakup.metro.duration,
      true,
      basic,
      hra,
    );
    const nonMetroExemption = calculateRentDeduction(
      rentBreakup.nonMetro.amount,
      rentBreakup.nonMetro.duration,
      false,
      basic,
      hra,
    );
    const totalExemption = metroExemption + nonMetroExemption;
    return totalExemption > hra ? hra : totalExemption;
  };

  useEffect(() => {
    const deductedAmount = calculateRentDeductedAmount(collections, basic, hra);
    dispatch(setRentDeductedAmount(deductedAmount));
  }, [dispatch, basic, hra, collections]);
};
export default useRentExemption;
