export interface IncomeReducerType {
  overallAmount: number;
  options: IncomeOption[];
  isEditable: boolean;
  editableEntryId: string;
  deleteEntry: IncomeDeleteEntry | undefined;
}
export type IncomeGroup = "salary" | "extra";
export interface IncomeOption {
  id?: string;
  category: string;
  amount: number;
  group: IncomeGroup;
}
export interface IncomeDeleteEntry {
  id: string;
  category: string;
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
