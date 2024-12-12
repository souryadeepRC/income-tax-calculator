export interface IncomeReducerType {
  overallAmount: number;
  options: IncomeOption[];
  isEditable: boolean;
  editableEntryId: string;
}
export interface IncomeOption {
  id?: string;
  label: string;
  amount: number;
  category: "salary" | "extra";
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
