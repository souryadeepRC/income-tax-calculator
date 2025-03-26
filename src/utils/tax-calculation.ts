import { DeductionReducerType } from "src/types/deduction-types";
import { IncomeOption } from "src/types/income-types";
import { TaxBreakupType, TaxReducerType, TaxScheme } from "src/types/tax-types";

const IS_NEW_SCHEME = true;
export const calculateByNewTaxSlab = (taxableAmount: number): number => {
  const TAX_SLAB_AMOUNT = 400000;
  /* ------- The income tax rebate limit : 7 Lakh ----*/
  if (taxableAmount <= 700000) {
    return 0;
  }
  /* -------  Up to Rs.3 lakh - 0% ------- 
     ------- Rs.3 lakh to Rs.7 lakh - 5% ---- */
  let taxAmount = TAX_SLAB_AMOUNT * 0.05;

  /* ------- Rs.7 lakh to Rs.10 lakh - 10% ----*/
  if (taxableAmount > 700000 && taxableAmount <= 1000000) {
    return taxAmount + (taxableAmount - 700000) * 0.1;
  } else {
    taxAmount += (1000000 - 700000) * 0.1;
  }

  /* ------- Rs.10 lakh to Rs.12 lakh - 15% ----*/
  if (taxableAmount > 1000000 && taxableAmount <= 1200000) {
    return taxAmount + (taxableAmount - 1000000) * 0.15;
  } else {
    taxAmount += (1200000 - 1000000) * 0.15;
  }

  /* ------- Rs.12 lakh to Rs.15 lakh - 20% ----*/
  if (taxableAmount > 1200000 && taxableAmount <= 1500000) {
    return taxAmount + (taxableAmount - 1200000) * 0.2;
  } else {
    taxAmount += (1500000 - 1200000) * 0.2;
  }

  /* ------- Above Rs.15 lakh - 30% ----*/
  return taxAmount + (taxableAmount - 1500000) * 0.3;
};

export const calculateByOldTaxSlab = (taxableAmount: number): number => {
  const TAX_SLAB_AMOUNT = 250000;
  /* ------- The income tax rebate limit : 5 Lakh ----*/
  if (taxableAmount <= 500000) {
    return 0;
  }
  /* --- Up to Rs.2.5Lakh  - 0% ---
     --- Rs.2.5Lakh to Rs.5Lakh  -  5% -- */
  let taxAmount = TAX_SLAB_AMOUNT * 0.05;

  /* --- Rs.5Lakh to Rs.10Lakh -  20% -- */
  if (taxableAmount > 500000 && taxableAmount <= 1000000) {
    return taxAmount + (taxableAmount - 500000) * 0.2;
  } else {
    taxAmount += 500000 * 0.2;
  }

  /* ------- Above Rs.10 lakh - 30% ----*/
  return taxAmount + (taxableAmount - 1000000) * 0.3;
};
const calculateCess = (incomeTax: number) => incomeTax * 0.04;
export const formatNumber = (value: number): number => {
  if (!value) return 0;
  return value % 1 === 0 ? value : +value.toFixed(2);
};

export const calculateIncomeTax = (
  income: number,
  deductedAmount: number,
  standardDeduction: number,
  type: boolean
): TaxScheme => {
  const taxableAmount = income - standardDeduction;
  let baseTax = 0;
  if (type) {
    baseTax = calculateByNewTaxSlab(taxableAmount);
  } else {
    baseTax = calculateByOldTaxSlab(taxableAmount);
  }
  const cessAmount = calculateCess(baseTax);
  const yearlyTax = baseTax + cessAmount;
  const monthlyTax = yearlyTax / 12;
  return {
    taxableAmount: taxableAmount > 0 ? taxableAmount : 0,
    baseTax,
    cessAmount,
    yearlyTax,
    monthlyTax,
    deductedAmount: deductedAmount + standardDeduction,
  };
};
export const calculateRentDeduction = (
  amount: number,
  duration: number,
  isMetroCity: boolean,
  basic: number,
  hra: number
): number => {
  const METRO_CITY_LIMIT = 0.5;
  const NON_METRO_CITY_LIMIT = 0.4;
  const ruleByRent = amount * duration - basic * 0.1;
  const ruleByBasic =
    basic * (isMetroCity ? METRO_CITY_LIMIT : NON_METRO_CITY_LIMIT);

  const comparativeAmount = Math.min(hra, ruleByRent, ruleByBasic);
  return comparativeAmount > 0 ? comparativeAmount : 0;
};

export const calculateTax = (
  salaryIncome: IncomeOption[],
  totalIncome: number,
  deductionDetail: DeductionReducerType
): TaxReducerType => {
  let deductedAmount = 0;
  const pfAmount =
    salaryIncome?.find((income) => income.category.toLowerCase() === "pf")
      ?.amount || 0;
  const taxableAmount = totalIncome - pfAmount;

  deductedAmount += deductionDetail.rent.deductedAmount;
  deductedAmount += deductionDetail.section24.deductedAmount;
  deductedAmount += deductionDetail.section80C.deductedAmount;
  deductedAmount += deductionDetail.chapter6.deductedAmount;

  const taxBreakup: TaxBreakupType = {
    newScheme: calculateIncomeTax(
      taxableAmount,
      0,
      deductionDetail.standardDeduction.newScheme,
      IS_NEW_SCHEME
    ),
    oldScheme: calculateIncomeTax(
      taxableAmount - deductedAmount,
      deductedAmount,
      deductionDetail.standardDeduction.oldScheme,
      !IS_NEW_SCHEME
    ),
  };
  const amount: number =
    taxBreakup.newScheme.yearlyTax - taxBreakup.oldScheme.yearlyTax;
  const bestScheme = amount < 0 ? "newScheme" : "oldScheme";
  const difference: number = amount < 0 ? amount * -1 : amount;
  const percentage: number =
    (difference / taxBreakup.oldScheme.yearlyTax) * 100;

  return {
    ...taxBreakup,
    choice: {
      taxAmount: {
        yearly: taxBreakup[bestScheme].yearlyTax,
        monthly: taxBreakup[bestScheme].monthlyTax,
      },
      difference,
      type: bestScheme === "newScheme" ? "New" : "Old",
      percentage,
    },
  };
};
