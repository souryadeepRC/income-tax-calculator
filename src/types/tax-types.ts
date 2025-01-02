export interface TaxReducerType {
  choice: TaxChoice;
  newScheme: TaxScheme;
  oldScheme: TaxScheme;
}
export interface TaxBreakupType {
  newScheme: TaxScheme;
  oldScheme: TaxScheme;
}
export type TaxChoiceType = "New" | "Old";
export interface TaxChoice {
  taxAmount: {
    monthly: number;
    yearly: number;
  };
  difference: number;
  type: TaxChoiceType;
  percentage: number;
}
export interface TaxScheme {
  baseTax: number;
  cessAmount: number;
  monthlyTax: number;
  taxableAmount: number;
  yearlyTax: number;
  deductedAmount: number;
}
