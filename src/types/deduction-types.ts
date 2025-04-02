export type DeductionType = "Rent" | "Section24" | "80C" | "Chapter6A";
export type DeductionReducerType = {
  actionEntry: ActionEntry;
  entries: DeductionEntries;
};
export interface ActionEntry {
  type: DeductionType | undefined;
  entryId: string;
  isEditable: boolean;
  isDelete: boolean;
}
export type DeductionEntries = {
  rent: RentEntry;
  section24: DeductionEntry;
  section80C: DeductionEntry;
  chapter6: DeductionEntry;
  others: DeductionEntry;
};
export type DeductionEntriesType =
  | "rent"
  | "section24"
  | "section80C"
  | "chapter6"
  | "others";

export type RentEntry = {
  options: RentOption[];
  deductedAmount: number;
};
export type DeductionEntry = {
  options: DeductionOption[];
  deductedAmount: number;
};
export type RentOption = {
  id: string;
  amount: number;
  duration: number;
  isMetroCity: boolean;
};
export interface DeductionOption {
  id: string;
  category: string;
  amount: number;
  duration?: number;
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

/* export interface DeductionByRent {
  options: RentEntry[];
  deductedAmount: number;
  isEditable: boolean;
  editableEntryId: string;
} */
// Section 80C Deduction

export interface Section24Entry {
  id: string;
  amount: number;
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

export interface DeductionResponse {
  id: string;
  type: DeductionType;
  amount: number;
  category: string;
  duration: number;
}
