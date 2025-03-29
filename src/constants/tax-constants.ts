import {
  SurChargeSlabType,
  TaxChoiceType,
  TaxSlabType,
} from "src/types/tax-types";

export const TAX_SCHEME: Record<string, TaxChoiceType> = {
  NEW: "New",
  OLD: "Old",
};

export const TAX_SLAB: Record<string, TaxSlabType[]> = {
  New: [
    {
      minLimit: 0,
      maxLimit: 400000,
      taxRate: 0,
      label: "Up to ₹4,00,000",
    },
    {
      minLimit: 400001,
      maxLimit: 800000,
      taxRate: 5,
      label: "₹4,00,001 to ₹8,00,000",
    },
    {
      minLimit: 800001,
      maxLimit: 1200000,
      taxRate: 10,
      label: "₹8,00,001 to ₹12,00,000",
    },
    {
      minLimit: 1200001,
      maxLimit: 1600000,
      taxRate: 15,
      label: "₹12,00,001 to ₹16,00,000",
    },
    {
      minLimit: 1600001,
      maxLimit: 2000000,
      taxRate: 20,
      label: "₹16,00,001 to ₹20,00,000",
    },
    {
      minLimit: 2000001,
      maxLimit: 2400000,
      taxRate: 25,
      label: "₹20,00,001 to ₹24,00,000",
    },
    {
      minLimit: 2400001,
      maxLimit: Infinity,
      taxRate: 30,
      label: "Above ₹24,00,000",
    },
  ],
  Old: [
    {
      minLimit: 0,
      maxLimit: 250000,
      taxRate: 0,
      label: "Up to ₹2,50,000",
    },
    {
      minLimit: 250001,
      maxLimit: 500000,
      taxRate: 5,
      label: "₹2,50,001 to ₹5,00,000",
    },
    {
      minLimit: 500001,
      maxLimit: 1000000,
      taxRate: 20,
      label: "₹5,00,001 to ₹10,00,000",
    },
    {
      minLimit: 1000001,
      maxLimit: Infinity,
      taxRate: 30,
      label: "Above ₹10,00,000",
    },
  ],
};
export const TAX_REBATE: Record<string, number> = {
  New: 1200000,
  Old: 500000,
};
export const SURCHARGE_SLAB: Record<string, SurChargeSlabType[]> = {
  New: [
    {
      minLimit: 0,
      maxLimit: 5000000,
      surchargeRate: 0,
      label: "Up to ₹50 Lakh",
    },
    {
      minLimit: 5000001,
      maxLimit: 10000000,
      surchargeRate: 10,
      label: "Above ₹50 Lakh and up to ₹1 Crore",
    },
    {
      minLimit: 10000001,
      maxLimit: 20000000,
      surchargeRate: 15,
      label: "Above ₹1 Crore and up to ₹2 Crore",
    },
    {
      minLimit: 20000001,
      maxLimit: 50000000,
      surchargeRate: 25,
      label: "Above ₹2 Crore and up to ₹5 Crore",
    },
    {
      minLimit: 50000001,
      maxLimit: Infinity,
      surchargeRate: 25,
      label: "Above ₹5 Crore",
    },
  ],
  Old: [
    {
      minLimit: 0,
      maxLimit: 5000000,
      surchargeRate: 0,
      label: "Up to ₹50 Lakh",
    },
    {
      minLimit: 5000001,
      maxLimit: 10000000,
      surchargeRate: 10,
      label: "Above ₹50 Lakh and up to ₹1 Crore",
    },
    {
      minLimit: 10000001,
      maxLimit: 20000000,
      surchargeRate: 15,
      label: "Above ₹1 Crore and up to ₹2 Crore",
    },
    {
      minLimit: 20000001,
      maxLimit: 50000000,
      surchargeRate: 25,
      label: "Above ₹2 Crore and up to ₹5 Crore",
    },
    {
      minLimit: 50000001,
      maxLimit: Infinity,
      surchargeRate: 37,
      label: "Above ₹5 Crore",
    },
  ],
};
