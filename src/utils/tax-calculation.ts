import {
  DeductionReducerType,
  RentDeductionType,
} from "src/types/deduction-types";
import { IncomeReducerType } from "src/types/income-types";

const IS_NEW_SCHEME = true;
const calculateByNewTaxSlab = (taxableAmount: number) => {
  const TAX_SLAB_AMOUNT = 300000;
  /* ------- The income tax rebate limit : 7 Lakh ----*/
  if (taxableAmount <= 700000) {
    return 0;
  }
  /* -------  Up to Rs.3 lakh - 0% ------- 
     ------- Rs.3 lakh to Rs.6 lakh - 5% ----*/
  let taxAmount = TAX_SLAB_AMOUNT * 0.05;

  /* ------- Rs.6 lakh to Rs.9 lakh - 10% ----*/
  if (taxableAmount > 600000 && taxableAmount <= 900000) {
    return taxAmount + (taxableAmount - 600000) * 0.1;
  } else {
    taxAmount += TAX_SLAB_AMOUNT * 0.1;
  }

  /* ------- Rs.9 lakh to Rs.12 lakh - 15% ----*/
  if (taxableAmount > 900000 && taxableAmount <= 1200000) {
    return taxAmount + (taxableAmount - 900000) * 0.15;
  } else {
    taxAmount += TAX_SLAB_AMOUNT * 0.15;
  }

  /* ------- Rs.12 lakh to Rs.15 lakh - 20% ----*/
  if (taxableAmount > 1200000 && taxableAmount <= 1500000) {
    return taxAmount + (taxableAmount - 1200000) * 0.2;
  } else {
    taxAmount += TAX_SLAB_AMOUNT * 0.2;
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

const calculateIncomeTax = (taxableAmount: number, type: any) => {
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
  };
};
const calculateRentDeduction = (
  rentDeduction: RentDeductionType,
  basic: number,
  hra: number
) => {
  const METRO_CITY_LIMIT = 0.5;
  const NON_METRO_CITY_LIMIT = 0.4;
  const ruleByRent =
    rentDeduction.amount * rentDeduction.duration - basic * 0.1;
  const ruleByBasic =
    basic *
    (rentDeduction.isMetroCity ? METRO_CITY_LIMIT : NON_METRO_CITY_LIMIT);

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
const calculateTax = (
  totalIncome: IncomeReducerType,
  deductionDetail: DeductionReducerType
) => {
  let deductedAmount = 0;
  const taxableAmount = totalIncome.salary - totalIncome.pf;
  deductedAmount += deductionDetail.standardDeduction;

  deductedAmount += calculateRentDeduction(
    deductionDetail.rent,
    totalIncome.basic,
    totalIncome.hra
  );

  deductedAmount +=
    deductionDetail.section24 > 200000 ? 200000 : deductionDetail.section24;

  deductedAmount += calculate80CDeduction(deductionDetail.deduction80C);

  deductedAmount += calculateChapter6CDeduction(
    deductionDetail.deductionByChapter6
  );
  console.log({ taxableAmount, deductedAmount });

  const newSchemeTaxableIncome =
    +taxableAmount - deductionDetail.standardDeduction;
  let taxBreakup: any = {
    newScheme: calculateIncomeTax(newSchemeTaxableIncome, IS_NEW_SCHEME),
    oldScheme: calculateIncomeTax(
      taxableAmount - deductedAmount,
      !IS_NEW_SCHEME
    ),
  };
  const difference: number =
    taxBreakup.newScheme.monthlyTax - taxBreakup.oldScheme.monthlyTax;
  taxBreakup["difference"] = {
    amount: difference < 0 ? difference * -1 : difference,
    type: difference < 0 ? "New" : "Old",
  };
  return taxBreakup;
};

export { calculateTax };

