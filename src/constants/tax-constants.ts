import { TaxChoiceType } from "src/types/tax-types";

export const TAX_SCHEME: Record<string, TaxChoiceType> = {
  NEW: "New",
  OLD: "Old",
};
export type TaxSlabType = {
  minLimit: number;
  maxLimit: number;
  taxPercentage: number;
  label: string;
};
export const TAX_SLAB: Record<string, TaxSlabType[]> = {
  New: [
    {
      minLimit: 0,
      maxLimit: 400000,
      taxPercentage: 0,
      label: "Up to ₹4,00,000",
    },
    {
      minLimit: 400001,
      maxLimit: 800000,
      taxPercentage: 5,
      label: "₹4,00,001 to ₹8,00,000",
    },
    {
      minLimit: 800001,
      maxLimit: 1200000,
      taxPercentage: 10,
      label: "₹8,00,001 to ₹12,00,000",
    },
    {
      minLimit: 1200001,
      maxLimit: 1600000,
      taxPercentage: 15,
      label: "₹12,00,001 to ₹16,00,000",
    },
    {
      minLimit: 1600001,
      maxLimit: 2000000,
      taxPercentage: 20,
      label: "₹16,00,001 to ₹20,00,000",
    },
    {
      minLimit: 2000001,
      maxLimit: 2400000,
      taxPercentage: 25,
      label: "₹20,00,001 to ₹24,00,000",
    },
    {
      minLimit: 2400001,
      maxLimit: Infinity,
      taxPercentage: 30,
      label: "Above ₹24,00,000",
    },
  ],
  Old: [
    {
      minLimit: 0,
      maxLimit: 250000,
      taxPercentage: 0,
      label: "Up to ₹2,50,000",
    },
    {
      minLimit: 250001,
      maxLimit: 500000,
      taxPercentage: 5,
      label: "₹2,50,001 to ₹5,00,000",
    },
    {
      minLimit: 500001,
      maxLimit: 1000000,
      taxPercentage: 20,
      label: "₹5,00,001 to ₹10,00,000",
    },
    {
      minLimit: 1000001,
      maxLimit: Infinity,
      taxPercentage: 30,
      label: "Above ₹10,00,000",
    },
  ],
};
