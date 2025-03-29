// types
import { ReducerActionPayloadType } from "src/types/store-types";
import {
  DeductionEntry,
  DeductionReducerType,
  Section24Entry,
} from "src/types/deduction-types";
// constants
import {
  RESET_DEDUCTION_ACTION,
  EDIT_DEDUCTION,
  SAVE_RENT_ENTRY,
  DELETE_RENT_ENTRY,
  SET_RENT_DEDUCTED_AMOUNT,
  SAVE_SECTION_24_ENTRY,
  DELETE_SECTION_24_ENTRY,
  SAVE_CHAPTER_VI_ENTRY,
  DELETE_CHAPTER_VI_ENTRY,
  LOAD_DEDUCTION,
  DELETE_DEDUCTION,
  SAVE_SECTION_80C_ENTRY,
  DELETE_SECTION_80C_ENTRY,
} from "src/store/deduction/deduction-constants";
import {
  mapSaveRentEntry,
  mapDeleteEntry,
  mapSaveEntry,
} from "./mapper/deduction-rent-mapper";
import {
  mapDeleteDeductionEntry,
  mapSaveDeductionEntry,
} from "./mapper/deduction-80C-mapper";
import {
  SECTION_24_MAX_LIMIT,
  SECTION_80C_MAX_LIMIT,
} from "src/constants/common-constants";
import { mapDeductions } from "./mapper/deduction-mapper";

const initialState: DeductionReducerType = {
  standardDeduction: { newScheme: 75000, oldScheme: 50000 },
  actionEntry: {
    type: undefined,
    entryId: "",
    isEditable: false,
    isDelete: false,
  },
  options: [],
  rent: {
    options: [],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
  section24: {
    options: [],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
  section80C: {
    options: [],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
  chapter6: {
    options: [],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
};
const DeductionReducer = (
  state = initialState,
  action: ReducerActionPayloadType
): DeductionReducerType => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DEDUCTION: {
      return mapDeductions(state, payload);
    }

    // Modification of deduction entry

    case EDIT_DEDUCTION: {
      const { type, entryId } = payload;
      return {
        ...state,
        actionEntry: {
          ...state.actionEntry,
          type,
          ...(entryId ? { entryId } : {}),
          isEditable: true,
        },
      };
    }
    case DELETE_DEDUCTION: {
      const { type, entryId } = payload;
      return {
        ...state,
        actionEntry: {
          ...state.actionEntry,
          type,
          entryId,
          isDelete: true,
        },
      };
    }
    case RESET_DEDUCTION_ACTION: {
      return {
        ...state,
        actionEntry: initialState.actionEntry,
      };
    }
    // Rent deduction operations

    case SAVE_RENT_ENTRY: {
      return {
        ...state,
        rent: {
          ...state.rent,
          options: mapSaveRentEntry([...state.rent.options], payload),
        },
        actionEntry: initialState.actionEntry,
      };
    }
    case DELETE_RENT_ENTRY: {
      return {
        ...state,
        rent: {
          ...state.rent,
          options: state.rent.options.filter(
            (rentEntry) => rentEntry.id !== payload
          ),
        },
        actionEntry: initialState.actionEntry,
      };
    }
    case SET_RENT_DEDUCTED_AMOUNT: {
      return { ...state, rent: { ...state.rent, deductedAmount: payload } };
    }

    // Section 24 deduction operations
    case SAVE_SECTION_24_ENTRY: {
      const latestState = state.section24;
      const { options, deductedAmount } = mapSaveEntry(
        latestState,
        payload,
        SECTION_24_MAX_LIMIT
      );
      return {
        ...state,
        section24: {
          ...state.section24,
          options: options as Section24Entry[],
          deductedAmount,
        },
        actionEntry: initialState.actionEntry,
      };
    }
    case DELETE_SECTION_24_ENTRY: {
      const latestOptions = state.section24.options;
      const { options, deductedAmount } = mapDeleteEntry(
        latestOptions,
        payload,
        SECTION_24_MAX_LIMIT
      );
      return {
        ...state,
        section24: {
          ...state.section24,
          options: options as Section24Entry[],
          deductedAmount,
        },
        actionEntry: initialState.actionEntry,
      };
    }

    // Section 80C deduction operations
    case SAVE_SECTION_80C_ENTRY: {
      const latestState = state.section80C;
      const { options, deductedAmount } = mapSaveEntry(
        latestState,
        payload,
        SECTION_80C_MAX_LIMIT
      );
      return {
        ...state,
        section80C: {
          ...state.section80C,
          options: options as DeductionEntry[],
          deductedAmount,
        },
        actionEntry: initialState.actionEntry,
      };
    }
    case DELETE_SECTION_80C_ENTRY: {
      const latestOptions = state.section80C.options;
      const { options, deductedAmount } = mapDeleteEntry(
        latestOptions,
        payload,
        SECTION_80C_MAX_LIMIT
      );
      return {
        ...state,
        section80C: {
          ...state.section80C,
          options: options as DeductionEntry[],
          deductedAmount,
        },
        actionEntry: initialState.actionEntry,
      };
    }
    case SAVE_CHAPTER_VI_ENTRY: {
      const { options, deductedAmount } = state.chapter6;
      return {
        ...state,
        chapter6: {
          ...state.chapter6,
          ...mapSaveDeductionEntry([...options], deductedAmount, payload),
        },
      };
    }
    case DELETE_CHAPTER_VI_ENTRY: {
      const { options, deductedAmount } = state.chapter6;
      return {
        ...state,
        chapter6: {
          ...state.chapter6,
          ...mapDeleteDeductionEntry(options, deductedAmount, payload),
        },
      };
    }
    default:
      return state;
  }
};
export { DeductionReducer };
