export interface IncomeReducerType {
  income: {
    salary: Record<string, number>;
    extra: Record<string, number>;
  };
  tax: any;
  editableIncome: IncomeComponent;
}
export interface incomeDetailsUpdateType {
  type: string;
  amount: number;
}
export interface IncomeComponent {
  group: "salary" | "extra";
  label: string;
  amount: string;
}
