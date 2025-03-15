export interface IncomeReducerType {
  overallAmount: number;
  options: IncomeOption[];
  isEditable: boolean;
  editableEntryId: string;
}
export type IncomeGroup = "salary" | "extra";
export interface IncomeOption {
  id?: string;
  category: string;
  amount: number;
  group: IncomeGroup;
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
