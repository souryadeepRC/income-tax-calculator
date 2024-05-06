// types
import { ReducerActionPayloadType } from "src/store/reducer-types";
import { IncomeReducerType } from "src/types/income-types";
// constants
import { UPDATE_INCOME_DETAILS } from "src/store/income/income-constants";

const initialState: IncomeReducerType = {
  salary: 1000000, // 1110000 1000000
  basic: 350000, // 388500 350000 --> 35%
  hra: 175000, // 194250 175000--? 17.5%
  pf: 42000, // 46620 42000--> 42%
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
        [incomeType]: amount,
      };
    }

    default:
      return state;
  }
};
export { IncomeReducer };

