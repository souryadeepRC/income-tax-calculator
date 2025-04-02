import { STANDARD_DEDUCTION } from "src/constants/common-constants";
import {
  SURCHARGE_SLAB,
  TAX_REBATE,
  TAX_SCHEME,
  TAX_SLAB,
} from "src/constants/tax-constants";
import { IncomeOption } from "src/types/income-types";
import {
  SurChargeSlabType,
  TaxBreakupType,
  TaxReducerType,
  TaxScheme,
  TaxSlabType,
} from "src/types/tax-types";

export const calculateTaxAmount = (
  taxableAmount: number,
  taxSlab: TaxSlabType[],
  rebateAmount: number
): number => {
  if (taxableAmount <= rebateAmount) return 0;

  let tax = 0;
  for (var i = 0; i < taxSlab.length; i++) {
    const slab = taxSlab[i];
    if (taxableAmount > slab.maxLimit) {
      const effectiveAmount = slab.maxLimit - slab.minLimit;
      const calculatedTax = effectiveAmount * (slab.taxRate / 100);

      tax = tax + calculatedTax;
    } else {
      const effectiveAmount = taxableAmount - slab.minLimit;
      const calculatedTax = effectiveAmount * (slab.taxRate / 100);
      return tax + calculatedTax;
    }
  }
  return tax;
};
const calculateBaseTax = (taxableAmount: number, isNewRegime: boolean) => {
  if (isNewRegime) {
    return calculateTaxAmount(taxableAmount, TAX_SLAB.New, TAX_REBATE.New);
  } else {
    return calculateTaxAmount(taxableAmount, TAX_SLAB.Old, TAX_REBATE.Old);
  }
};
const calculateCess = (incomeTax: number) => incomeTax * 0.04;
const calculateSurcharge = (
  taxableAmount: number,
  incomeTax: number,
  isNewRegime: boolean
) => {
  const slabLimits: SurChargeSlabType[] = isNewRegime
    ? SURCHARGE_SLAB.New
    : SURCHARGE_SLAB.Old;

  const surchargeRate: number =
    slabLimits.find(
      (slabLimit) =>
        taxableAmount >= slabLimit.minLimit &&
        taxableAmount <= slabLimit.maxLimit
    )?.surchargeRate || 0;

  return incomeTax * (surchargeRate / 100);
};

export const formatNumber = (value: number): string => {
  if (!value) return "0";
  return value.toLocaleString("en-In", { maximumFractionDigits: 2 });
};

export const calculateIncomeTax = (
  income: number,
  deductedAmount: number,
  standardDeduction: number,
  isNewRegime: boolean
): TaxScheme => {
  const totalDeduction = deductedAmount + standardDeduction;
  const difference = income - totalDeduction;
  const taxableAmount = difference > 0 ? difference : income;

  const baseTax = calculateBaseTax(taxableAmount, isNewRegime);
  const surcharge = calculateSurcharge(taxableAmount, baseTax, isNewRegime);
  const cess = calculateCess(baseTax + surcharge);
  const yearlyTax = baseTax + surcharge + cess;
  const monthlyTax = yearlyTax / 12;
  return {
    income: {
      netIncome: income,
      taxableIncome: taxableAmount > 0 ? taxableAmount : 0,
    },
    tax: { baseTax, surcharge, cess, yearlyTax, monthlyTax },
    deduction: {
      standard: income > standardDeduction ? standardDeduction : 0,
      other: income - standardDeduction > deductedAmount ? deductedAmount : 0,
      total: income > totalDeduction ? totalDeduction : 0,
    },
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

const getPFAmount = (salaryIncome: IncomeOption[]): number => {
  return (
    salaryIncome?.find(
      (income) =>
        income.category.toLowerCase() === "pf" ||
        income.category.toLowerCase() === "provident fund" ||
        income.category.toLowerCase() === "providentfund"
    )?.amount || 0
  );
};

const IS_NEW_SCHEME = true;
export const calculateTax = (
  salaryIncome: IncomeOption[],
  totalIncome: number,
  deductedAmount: number
): TaxReducerType => {
  const taxableAmount = totalIncome - getPFAmount(salaryIncome);

  const taxBreakup: TaxBreakupType = {
    new: calculateIncomeTax(
      taxableAmount,
      0,
      STANDARD_DEDUCTION.NEW,
      IS_NEW_SCHEME
    ),
    old: calculateIncomeTax(
      taxableAmount,
      deductedAmount,
      STANDARD_DEDUCTION.OLD,
      !IS_NEW_SCHEME
    ),
  };
  const amount: number =
    taxBreakup.new.tax.yearlyTax - taxBreakup.old.tax.yearlyTax;

  return {
    ...taxBreakup,
    choice: {
      difference: Math.abs(amount),
      type: amount < 0 ? TAX_SCHEME.NEW : TAX_SCHEME.OLD,
    },
  };
};
