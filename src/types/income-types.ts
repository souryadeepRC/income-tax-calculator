export type IncomeReducerType = {
  income: { salary: number; basic: number; hra: number; pf: number };
  tax: any;
};
export type incomeDetailsUpdateType = {
  type: string;
  amount: number;
};
