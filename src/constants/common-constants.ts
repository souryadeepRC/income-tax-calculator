export const NUMERIC_REGEX = /^(?!0(\.0{1,2})?$)\d+(\.\d{1,2})?$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const DEDUCTION_80C_OPTIONS: Record<string, string> = {
  providentFund: "Provident Fund",
  lic: "LIC",
  nps: "Nation Pension Scheme",
  ppf: "PPF",
  homeLoanPrincipal: "Home Loan Principal",
  stampDuty: "Stamp Duty",
  taxSavingFD: "Tax Saving FD",
  others: "Others(VPF,NSC etc.)",
};
export const DEDUCTION_CHAPTER_VI_OPTIONS: Record<
  string,
  { label: string; maxLimit?: number }
> = {
  medicalInsuranceSelf: {
    label: "Medical Insurance Self/spouse/children - 80D",
    maxLimit: 25000,
  },
  medicalInsuranceParent: {
    label: "Medical Insurance Parent - 80D",
    maxLimit: 50000,
  },
  handicappedDependent: {
    label: "Handicapped Dependent - 80DD",
  },
  specifiedDiseaseTreatment: {
    label: "Specified Disease Treatment - 80DDB",
  },
  educationLoanInterest: {
    label: "Education Loan Interest - 80E",
  },
  selfDisability: {
    label: "Self Disability - 80U",
  },
  additionalHomeLoanInterest: {
    label: "Additional Home Loan Interest - 80EEA/80EEB",
    maxLimit: 150000,
  },
  additionalNps: {
    label: "Electric Vehicle Interest - 80EEB",
  },
  electricVehicleInterest: {
    label: "Additional Nps - 80CCD(2)/ 80CCD1B",
  },
};
export const DEDUCTION_MAX_LIMIT: Record<string, number> = {
  SECTION_24: 200000,
  SECTION_80C: 150000,
};
