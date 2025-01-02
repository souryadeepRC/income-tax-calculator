export interface IncomeReducerType {
  overallAmount: number;
  options: IncomeOption[];
  isEditable: boolean;
  editableEntryId: string;
}
export type IncomeCategory = "salary" | "extra";
export interface IncomeOption {
  id?: string;
  label: string;
  amount: number;
  category: IncomeCategory;
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
