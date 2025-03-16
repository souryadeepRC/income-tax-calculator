// types
import { ReducerActionPayloadType } from "src/types/store-types";
import { IncomeOption, IncomeReducerType } from "src/types/income-types";
// constants
import {
  EDIT_INCOME_ENTRY,
  SAVE_INCOME_DETAILS,
  DELETE_INCOME_DETAILS,
  RESET_EDIT_INCOME_ENTRY,
  LOAD_INCOME_DETAILS,
  DELETE_INCOME_ENTRY,
} from "src/store/income/income-constants";
import { mapDeleteIncomeEntry, mapSaveIncomeEntry } from "./income-mapper";

const initialState: IncomeReducerType = {
  overallAmount: 0,
  options: [],
  actionEntry: {
    entryId: "",
    isEditable: false,
    isDelete: false,
  },
};
const IncomeReducer = (
  state = initialState,
  action: ReducerActionPayloadType
): IncomeReducerType => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_INCOME_DETAILS: {
      return {
        ...state,
        options: payload,
        overallAmount: payload.reduce(
          (acc: number, option: IncomeOption) => acc + option.amount,
          0
        ),
      };
    }
    case EDIT_INCOME_ENTRY: {
      return {
        ...state,
        actionEntry: {
          ...state.actionEntry,
          isEditable: true,
          ...(payload ? { entryId: payload } : {}),
        },
      };
    }
    case DELETE_INCOME_ENTRY: {
      return {
        ...state,
        actionEntry: {
          ...state.actionEntry,
          isDelete: true,
          entryId: payload,
        },
      };
    }
    case RESET_EDIT_INCOME_ENTRY: {
      return {
        ...state,
        actionEntry: initialState.actionEntry,
      };
    }
    case SAVE_INCOME_DETAILS: {
      return {
        ...state,
        ...mapSaveIncomeEntry(state, payload),
        actionEntry: initialState.actionEntry,
      };
    }
    case DELETE_INCOME_DETAILS: {
      return {
        ...state,
        ...mapDeleteIncomeEntry(state, payload),
        actionEntry: initialState.actionEntry,
      };
    }
    default:
      return state;
  }
};
export { IncomeReducer };
