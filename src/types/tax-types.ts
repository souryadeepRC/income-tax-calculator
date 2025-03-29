export interface TaxReducerType {
  choice: TaxChoice;
  new: TaxScheme;
  old: TaxScheme;
}
export interface TaxBreakupType {
  new: TaxScheme;
  old: TaxScheme;
}
export type TaxChoiceType = "New" | "Old";
export interface TaxChoice {
  difference: number;
  type: TaxChoiceType;
}
export interface TaxScheme {
  tax: {
    baseTax: number;
    surcharge: number;
    cess: number;
    monthlyTax: number;
    yearlyTax: number;
  };
  income: {
    netIncome: number;
    taxableIncome: number;
  };
  deduction: {
    standard: number;
    other: number;
    total: number;
  };
}
export interface TaxBreakup {
  choice: TaxChoice;
  new: TaxScheme;
  old: TaxScheme;
}

export type TaxDetails = {};
export type TaxSlabType = {
  minLimit: number;
  maxLimit: number;
  taxRate: number;
  label: string;
};
export type SurChargeSlabType = {
  minLimit: number;
  maxLimit: number;
  surchargeRate: number;
  label: string;
};
