import { DeductionReducerType } from "src/types/deduction-types";

const IS_NEW_SCHEME = true;
const calculateByNewTaxSlab = (taxableAmount: number) => {
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

const calculateByOldTaxSlab = (taxableAmount: number) => {
  /* ------- The income tax rebate limit : 5 Lakh ----*/
  if (taxableAmount <= 500000) {
    return 0;
  }
  /* --- Up to Rs.2.5Lakh  - 0% ---
     --- Rs.2.5Lakh to Rs.5Lakh  -  5% -- */
  let taxAmount = 250000 * 0.05;

  /* --- Rs.5Lakh to Rs.10Lakh -  5% -- */
  if (taxableAmount > 500000 && taxableAmount <= 1000000) {
    return taxAmount + (taxableAmount - 500000) * 0.2;
  } else {
    taxAmount += 500000 * 0.2;
  }

  /* ------- Above Rs.10 lakh - 30% ----*/
  return taxAmount + (taxableAmount - 1000000) * 0.3;
};
const calculateCess = (incomeTax: number) => incomeTax * 0.04;
export const formatNumber = (value: number) => {
  if (!value) return 0;
  return value % 1 === 0 ? value : +value.toFixed(2);
};

const calculateIncomeTax = (
  income: number,
  deductedAmount: number,
  standardDeduction: number,
  type: any
) => {
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
    taxableAmount,
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
) => {
  const METRO_CITY_LIMIT = 0.5;
  const NON_METRO_CITY_LIMIT = 0.4;
  const ruleByRent = amount * duration - basic * 0.1;
  const ruleByBasic =
    basic * (isMetroCity ? METRO_CITY_LIMIT : NON_METRO_CITY_LIMIT);

  const comparativeAmount = Math.min(hra, ruleByRent, ruleByBasic);
  return comparativeAmount > 0 ? comparativeAmount : 0;
};
const calculate80CDeduction = (deductionBy80C: any) => {
  let totalDeduction = 0;
  for (const item in deductionBy80C) {
    totalDeduction += deductionBy80C[item];
  }
  return totalDeduction > 150000 ? 150000 : totalDeduction;
};
const calculateChapter6CDeduction = (deductionByChapter6: any) => {
  let totalDeduction = 0;
  for (const item in deductionByChapter6) {
    if (item === "medicalInsuranceSelf") {
      totalDeduction +=
        deductionByChapter6.medicalInsuranceSelf > 25000
          ? 25000
          : deductionByChapter6.medicalInsuranceSelf;
    } else if (item === "medicalInsuranceParent") {
      totalDeduction +=
        deductionByChapter6.medicalInsuranceParent > 50000
          ? 50000
          : deductionByChapter6.medicalInsuranceParent;
    } else if (item === "additionalHomeLoanInterest") {
      totalDeduction +=
        deductionByChapter6.additionalHomeLoanInterest > 150000
          ? 150000
          : deductionByChapter6.additionalHomeLoanInterest;
    } else {
      totalDeduction += deductionByChapter6[item];
    }
  }
  return totalDeduction;
};
export const calculateTax = (
  salaryIncome: any,
  totalIncome: number,
  deductionDetail: DeductionReducerType
) => {
  let deductedAmount = 0;
  const taxableAmount = totalIncome - salaryIncome.pf;

  /* deductedAmount += calculateRentDeduction(
    deductionDetail.rent,
    salaryIncome.basic,
    salaryIncome.hra
  ); */

  deductedAmount +=
    deductionDetail.section24 > 200000 ? 200000 : deductionDetail.section24;

  deductedAmount += calculate80CDeduction(deductionDetail.deduction80C);

  deductedAmount += calculateChapter6CDeduction(
    deductionDetail.deductionByChapter6
  );

  let taxBreakup: any = {
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
  taxBreakup["choice"] = {
    taxAmount: {
      yearly: taxBreakup[bestScheme].yearlyTax,
      monthly: taxBreakup[bestScheme].monthlyTax,
    },
    difference,
    label: bestScheme === "newScheme" ? "New" : "Old",
    percentage,
  };
  return taxBreakup;
};
