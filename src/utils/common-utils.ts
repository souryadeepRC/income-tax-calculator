import { NUMERIC_REGEX } from "src/constants/common-constants";

/* eslint-disable */
export const updateState = (field: string, value: any) => (object: any) => {
  return {
    ...object,
    [field]: value,
  };
};

export const ErrorMessage = {
  amountInput: (amount: string): string => {
    console.log({ amount });

    if (amount === "") {
      return "Amount is required";
    } else if (!NUMERIC_REGEX.test(amount)) {
      return "Enter a valid amount ( max 2 decimal ) more than 0 (e.g. 100.50 or 100)";
    }
    return "";
  },
  rentDuration: (duration: string, maxDuration: number): string => {
    if (duration === "") {
      return "Rent Duration is required";
    }
    if (!NUMERIC_REGEX.test(duration)) {
      return "Enter a valid duration more than 0 (e.g. 2 or 2.5)";
    } else if (Number(duration) > maxDuration) {
      return "Cannot add more than 12 months for a FY.Please check other entries";
    }
    return "";
  },
};
