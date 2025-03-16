import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRentDeductedAmount } from "src/store/deduction/deduction-actions";
import { selectRentOptions } from "src/store/deduction/deduction-selectors";
import { selectRentEligibleDetails } from "src/store/income/income-selectors";
import { RentEntry } from "src/types/deduction-types";
import { calculateRentDeduction } from "src/utils/tax-calculation";
type RentBreakup = {
  metro: { duration: number; amount: number };
  nonMetro: { duration: number; amount: number };
};
const useRentExemption = (): void => {
  const dispatch = useDispatch();
  const options = useSelector(selectRentOptions);
  const { basic, hra } = useSelector(selectRentEligibleDetails);
  const calculateRentDeductedAmount = (
    rentCollections: RentEntry[],
    basic: number,
    hra: number
  ) => {
    const rentBreakup = rentCollections.reduce(
      (acc: RentBreakup, rentEntry: RentEntry) => {
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
      }
    );

    const metroExemption = calculateRentDeduction(
      rentBreakup.metro.amount,
      rentBreakup.metro.duration,
      true,
      basic,
      hra
    );
    const nonMetroExemption = calculateRentDeduction(
      rentBreakup.nonMetro.amount,
      rentBreakup.nonMetro.duration,
      false,
      basic,
      hra
    );
    const totalExemption = metroExemption + nonMetroExemption;
    return totalExemption > hra ? hra : totalExemption;
  };

  useEffect(() => {
    const deductedAmount = calculateRentDeductedAmount(options, basic, hra);
    dispatch(setRentDeductedAmount(deductedAmount));
  }, [dispatch, basic, hra, options]);
};
export default useRentExemption;
