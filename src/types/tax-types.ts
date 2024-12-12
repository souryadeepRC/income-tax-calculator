export interface TaxReducerType {
  choice: TaxChoice;
  newScheme: TaxScheme;
  oldScheme: TaxScheme;
}
export interface TaxChoice {
  taxAmount: {
    monthly: number;
    yearly: 0;
  };
  difference: number;
  type: "New" | "Old";
  percentage: number;
}
export interface TaxScheme {
  baseTax: number;
  cessAmount: number;
  monthlyTax: number;
  taxableAmount: number;
  yearlyTax: number;
}
