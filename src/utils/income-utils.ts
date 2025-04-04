import { NUMERIC_REGEX } from "src/constants/common-constants";
import { IncomeOption } from "src/types/income-types";

export const calculateOverallAmount = (incomeOptions: IncomeOption[]): number =>
  incomeOptions.reduce(
    (acc: number, { amount }: IncomeOption) => acc + amount,
    0
  );
export const isReservedCategory = (category: string) => {
  return category.toLowerCase() === "basic" || category.toLowerCase() === "hra";
};
export const getCategoryError = (category: string): string => {
  if (category === "") {
    return "Category is required";
  } else if (category.length > 100) {
    return "Enter a label within min 100 characters";
  } else if (isReservedCategory(category)) {
    return "Reserved category [e.g. BASIC, HRA]";
  }
  return "";
};
export const getAmountError = (amount: string): string => {
  if (amount === "") {
    return "Amount is required";
  } else if (!NUMERIC_REGEX.test(amount)) {
    return "Enter a valid amount up to 2 decimals (e.g., 100.50).";
  }
  return "";
};
