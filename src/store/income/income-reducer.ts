// types
import { ReducerActionPayloadType } from "src/store/reducer-types";
import { IncomeReducerType } from "src/types/income-types";
// constants
import {
  EDIT_INCOME_ENTRY,
  SAVE_INCOME_DETAILS,
  DELETE_INCOME_DETAILS,
  RESET_EDIT_INCOME_ENTRY,
} from "src/store/income/income-constants";
import { mapDeleteIncomeEntry, mapSaveIncomeEntry } from "./income-mapper";

const initialState: IncomeReducerType = {
  overallAmount: 0,
  options: [],
  isEditable: false,
  editableEntryId: "",
};
const IncomeReducer = (
  state = initialState,
  action: ReducerActionPayloadType,
) => {
  const { type, payload } = action;
  switch (type) {
    case EDIT_INCOME_ENTRY: {
      return {
        ...state,
        isEditable: true,
        ...(payload ? { editableEntryId: payload } : {}),
      };
    }
    case RESET_EDIT_INCOME_ENTRY: {
      return {
        ...state,
        isEditable: initialState.isEditable,
        editableEntryId: initialState.editableEntryId,
      };
    }
    case SAVE_INCOME_DETAILS: {
      return {
        ...state,
        ...mapSaveIncomeEntry(state, payload, initialState),
      };
    }
    case DELETE_INCOME_DETAILS: {
      return {
        ...state,
        ...mapDeleteIncomeEntry(state, payload, initialState),
      };
    }
    default:
      return state;
  }
};
export { IncomeReducer };
