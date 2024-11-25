// types
import { ReducerActionPayloadType } from "src/store/reducer-types";
import { IncomeComponent, IncomeReducerType } from "src/types/income-types";
// constants
import {
  MODIFY_INCOME_DETAILS,
  UPDATE_INCOME_DETAILS,
  UPDATE_TAX_DETAILS,
} from "src/store/income/income-constants";

const initialState: IncomeReducerType = {
  income: {
    salary: {
      // salary: 842079653, // 1110000 1000000
      basic: 350000, // 388500 350000 --> 35%
      hra: 175000, // 194250 175000--? 17.5%
      pf: 42000, // 46620 42000--> 42%
    },
    extra: {},
  },
  tax: {
    choice: {
      taxAmount: {
        monthly: 0,
        yearly: 0,
      },
      difference: 0,
      type: "New",
      percentage: 0,
    },
    newScheme: {
      baseTax: 0,
      cessAmount: 0,
      monthlyTax: 0,
      taxableAmount: 0,
      yearlyTax: 0,
    },
    oldScheme: {
      baseTax: 0,
      cessAmount: 0,
      monthlyTax: 0,
      taxableAmount: 0,
      yearlyTax: 0,
    },
  },
  editableIncome: {
    amount: "",
    label: "",
    group: "salary",
  },
};
const IncomeReducer = (
  state = initialState,
  action: ReducerActionPayloadType
) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_INCOME_DETAILS: {
      const { type: incomeType, amount } = payload;
      return {
        ...state,
        income: { ...state.income, [incomeType]: amount },
      };
    }
    case MODIFY_INCOME_DETAILS: {
      const { label, group, amount }: IncomeComponent = payload;
      return {
        ...state,
        income: {
          ...state.income,
          [group]: {
            ...state.income?.[group],
            [label]: +amount,
          },
        },
      };
    }
    case UPDATE_TAX_DETAILS: {
      return {
        ...state,
        tax: payload,
      };
    }
    default:
      return state;
  }
};
export { IncomeReducer };

