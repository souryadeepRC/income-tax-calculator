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
    cessAmount: number;
    monthlyTax: number;
    yearlyTax: number;
  };
  taxableAmount: number;
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
