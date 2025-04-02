import { useEffect, useMemo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// store
import { setRentDeductedAmount } from "src/store/deduction/deduction-reducer";
import { selectRentOptions } from "src/store/deduction/deduction-selectors";
import { selectRentEligibleDetails } from "src/store/income/income-selectors";
// types
import { RentEntry, RentOption } from "src/types/deduction-types";
// utils
import { calculateRentDeduction } from "src/utils/tax-calculation";

type RentBreakup = {
  metro: { duration: number; amount: number };
  nonMetro: { duration: number; amount: number };
};

const useRentExemption = (): void => {
  const dispatch = useDispatch();
  const options: RentOption[] = useSelector(selectRentOptions);
  const { basic, hra } = useSelector(selectRentEligibleDetails);

  const rentBreakup: RentBreakup = useMemo(() => {
    return options.reduce(
      (acc: RentBreakup, rentEntry: RentOption) => {
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
  }, [options]);

  const totalExemption = useMemo(() => {
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
    return Math.min(metroExemption + nonMetroExemption, hra);
  }, [rentBreakup, basic, hra]);

  useEffect(() => {
    dispatch(setRentDeductedAmount(totalExemption));
  }, [dispatch, totalExemption]);
};
export default useRentExemption;
