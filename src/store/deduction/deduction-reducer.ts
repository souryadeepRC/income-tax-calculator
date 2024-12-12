// types
import { ReducerActionPayloadType } from "src/store/reducer-types";
import { DeductionReducerType } from "src/types/deduction-types";
// constants
import {
  RESET_EDIT_RENT_ENTRY,
  EDIT_RENT_ENTRY,
  SAVE_RENT_ENTRY,
  DELETE_RENT_ENTRY,
  UPDATE_RENT_DEDUCTION,
  UPDATE_SECTION_24_DEDUCTION,
  SET_RENT_DEDUCTED_AMOUNT,
  EDIT_80C_ENTRY,
  SAVE_80C_ENTRY,
  DELETE_80C_ENTRY,
  RESET_EDIT_80C_ENTRY,
  EDIT_CHAPTER_VI_ENTRY,
  SAVE_CHAPTER_VI_ENTRY,
  DELETE_CHAPTER_VI_ENTRY,
  RESET_EDIT_CHAPTER_VI_ENTRY,
} from "src/store/deduction/deduction-constants";
import {
  mapDeleteRentEntry,
  mapEditRentEntry,
  mapSaveRentEntry,
} from "./mapper/deduction-rent-mapper";
import {
  mapDeleteDeductionEntry,
  mapEditDeductionCEntry,
  mapSaveDeductionEntry,
  resetDeductionOption,
} from "./mapper/deduction-80C-mapper";
import { DEDUCTION_MAX_LIMIT } from "src/constants/common-constants";

const initialState: DeductionReducerType = {
  standardDeduction: { newScheme: 75000, oldScheme: 50000 },
  rent: {
    collections: [],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
  section24: {
    amount: 0,
    deductedAmount: 0,
  },
  deduction80C: {
    options: [],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
  deductionByChapter6: {
    options: [],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
};
const DeductionReducer = (
  state = initialState,
  action: ReducerActionPayloadType
) => {
  const { type, payload } = action;
  switch (type) {
    case EDIT_RENT_ENTRY: {
      return {
        ...state,
        rent: mapEditRentEntry(state.rent, payload),
      };
    }
    case SAVE_RENT_ENTRY: {
      return {
        ...state,
        rent: mapSaveRentEntry(state.rent, payload, initialState.rent),
      };
    }
    case DELETE_RENT_ENTRY: {
      return {
        ...state,
        rent: mapDeleteRentEntry(state.rent, payload, initialState.rent),
      };
    }
    case SET_RENT_DEDUCTED_AMOUNT: {
      return { ...state, rent: { ...state.rent, deductedAmount: payload } };
    }
    case RESET_EDIT_RENT_ENTRY: {
      const { isEditable, editableEntryId } = initialState.rent;
      return {
        ...state,
        rent: {
          ...state.rent,
          isEditable,
          editableEntryId,
        },
      };
    }
    case UPDATE_RENT_DEDUCTION: {
      return {
        ...state,
        rent: payload,
      };
    }
    case UPDATE_SECTION_24_DEDUCTION: {
      return {
        ...state,
        section24: {
          amount: payload,
          deductedAmount: payload > 2000000 ? 2000000 : payload,
        },
      };
    }

    case EDIT_80C_ENTRY: {
      return {
        ...state,
        deduction80C: mapEditDeductionCEntry(state.deduction80C, payload),
      };
    }
    case SAVE_80C_ENTRY: {
      return {
        ...state,
        deduction80C: mapSaveDeductionEntry(
          state.deduction80C,
          payload,
          initialState.deduction80C,
          DEDUCTION_MAX_LIMIT.SECTION_80C
        ),
      };
    }
    case DELETE_80C_ENTRY: {
      return {
        ...state,
        deduction80C: mapDeleteDeductionEntry(
          state.deduction80C,
          payload,
          initialState.deduction80C,
          DEDUCTION_MAX_LIMIT.SECTION_80C
        ),
      };
    }
    case RESET_EDIT_80C_ENTRY: {
      return {
        ...state,
        deduction80C: resetDeductionOption(
          state.deduction80C,
          initialState.deduction80C
        ),
      };
    }
    case EDIT_CHAPTER_VI_ENTRY: {
      return {
        ...state,
        deductionByChapter6: mapEditDeductionCEntry(
          state.deductionByChapter6,
          payload
        ),
      };
    }
    case SAVE_CHAPTER_VI_ENTRY: {
      return {
        ...state,
        deductionByChapter6: mapSaveDeductionEntry(
          state.deductionByChapter6,
          payload,
          initialState.deductionByChapter6
        ),
      };
    }
    case DELETE_CHAPTER_VI_ENTRY: {
      return {
        ...state,
        deductionByChapter6: mapDeleteDeductionEntry(
          state.deductionByChapter6,
          payload,
          initialState.deductionByChapter6
        ),
      };
    }
    case RESET_EDIT_CHAPTER_VI_ENTRY: {
      return {
        ...state,
        deductionByChapter6: resetDeductionOption(
          state.deductionByChapter6,
          initialState.deductionByChapter6
        ),
      };
    }
    default:
      return state;
  }
};
export { DeductionReducer };
