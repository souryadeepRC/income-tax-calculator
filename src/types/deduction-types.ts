export type DeductionReducerType = {
  standardDeduction: { newScheme: number; oldScheme: number };
  rent: DeductionByRent;
  section24: number;
  deduction80C: DeductionType80C;
  deductionByChapter6: DeductionByChapter6Type;
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
  collections: RentEntry[];
  deductedAmount: number;
  isEditable: boolean;
  editableEntryId: string;
}
export type DeductionType80C = {
  providentFund: number;
  lic: number;
  nps: number;
  ppf: number;
  homeLoanPrincipal: number;
  stampDuty: number;
  taxSavingFD: number;
  others: number;
};
export type DeductionByChapter6Type = {
  medicalInsuranceSelf: number;
  medicalInsuranceParent: number;
  handicappedDependent: number;
  specifiedDiseaseTreatment: number;
  educationLoanInterest: number;
  selfDisability: number;
  additionalHomeLoanInterest: number;
  additionalNps: number;
  electricVehicleInterest: number;
};
export type RentDeductionType = {
  amount: number;
  duration: number;
  isMetroCity: boolean;
};
export type Deduction80CType = {
  providentFund: number;
  lic: number;
  nps: number;
  ppf: number;
  homeLoanPrincipal: number;
  stampDuty: number;
  taxSavingFD: number;
};
