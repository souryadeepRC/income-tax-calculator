export type DeductionType = "Rent" | "Section24" | "80C" | "Chapter6A";
export type DeductionReducerType = {
  standardDeduction: { newScheme: number; oldScheme: number };
  actionEntry: ActionEntry;
  options: DeductionResponse[];
  rent: DeductionByRent;
  section24: {
    options: Section24Entry[];
    deductedAmount: number;
    isEditable: boolean;
    editableEntryId: string;
  };
  section80C: DeductionOption;
  deductionByChapter6: DeductionOption;
};
export interface DeductionResponse {
  id: string;
  type: DeductionType;
  amount: number;
  maxLimit?: number;
  category?: string;
  duration?: number;
}
export interface ActionEntry {
  type: DeductionType | undefined;
  entryId: string;
  isEditable: boolean;
  isDelete: boolean;
}
export type ActionEditEntryPayload = {
  type: DeductionType;
  entryId?: string;
};
export type ActionDeleteEntryPayload = {
  type: DeductionType;
  entryId: string;
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
export interface Section24Entry {
  id: string;
  amount: number;
}
export interface DeductionEntry {
  id: string;
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
