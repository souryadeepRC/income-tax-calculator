export type DeductionReducerType = {
  standardDeduction: { newScheme: number; oldScheme: number };

  rent: DeductionByRent;
  section24: DeductionSection24;
  deduction80C: DeductionOption;
  deductionByChapter6: DeductionOption;
};
// Rent Deduction
export interface EditableRentEntry {
  isEditable: boolean;
  editableEntryId: string;
}
export interface RentEntry {
  id?: string;
  amount: number;
  duration: number;
  isMetroCity: boolean;
}
export interface DeductionByRent {
  options: RentEntry[];
  deductedAmount: number;
  isEditable: boolean;
  editableEntryId: string;
}
// Section 80C Deduction
export interface DeductionOption {
  options: DeductionEntry[];
  deductedAmount: number;
  isEditable: boolean;
  editableEntryId: string;
}
export interface DeductionEntry {
  id?: string;
  category: string;
  amount: number;
  maxLimit?: number;
}
export interface DeductionEntryOption {
  label: string;
  category: string;
  maxLimit?: number;
  isAdded: boolean;
}

export interface DeductionSection24 {
  id: string;
  amount: number;
  deductedAmount: number;
}
