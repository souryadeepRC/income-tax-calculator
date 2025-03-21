// types
import { ReducerActionPayloadType } from "src/types/store-types";
import { DeductionReducerType } from "src/types/deduction-types";
// constants
import {
  RESET_DEDUCTION_ACTION,
  EDIT_DEDUCTION,
  SAVE_RENT_ENTRY,
  DELETE_RENT_ENTRY,
  SET_RENT_DEDUCTED_AMOUNT,
  SAVE_SECTION_24_ENTRY,
  DELETE_SECTION_24_ENTRY,
  SAVE_80C_ENTRY,
  DELETE_80C_ENTRY,
  RESET_EDIT_80C_ENTRY,
  EDIT_CHAPTER_VI_ENTRY,
  SAVE_CHAPTER_VI_ENTRY,
  DELETE_CHAPTER_VI_ENTRY,
  RESET_EDIT_CHAPTER_VI_ENTRY,
  LOAD_DEDUCTION,
  DELETE_DEDUCTION,
} from "src/store/deduction/deduction-constants";
import {
  mapSaveRentEntry,
  mapSection24DeleteEntry,
  mapSection24Entry,
} from "./mapper/deduction-rent-mapper";
import {
  mapDeleteDeductionEntry,
  mapEditDeductionEntry,
  mapSaveDeductionEntry,
  resetDeductionOption,
} from "./mapper/deduction-80C-mapper";
import { DEDUCTION_MAX_LIMIT } from "src/constants/common-constants";
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
    options: [
      { id: "123", amount: 5000, duration: 2, isMetroCity: false },
      { id: "124", amount: 7000000000, duration: 1, isMetroCity: true },
      { id: "125", amount: 7000, duration: 1, isMetroCity: true },
      { id: "126", amount: 7000, duration: 2, isMetroCity: true },
      { id: "127", amount: 7000, duration: 1, isMetroCity: true },
      { id: "128", amount: 7000, duration: 1, isMetroCity: true },
      { id: "129", amount: 7000, duration: 1, isMetroCity: true },
    ],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
  section24: {
    options: [
      {
        id: "123",
        amount: 500,
      },
      {
        id: "124",
        amount: 5000,
      },
    ],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
  deduction80C: {
    options: [
      {
        id: "123",
        category: "providentFund",
        amount: 500,
        maxLimit: 20000,
      },
      {
        id: "124",
        category: "lic",
        amount: 5000,
        maxLimit: undefined,
      },
    ],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
  deductionByChapter6: {
    options: [
      {
        id: "123",
        category: "medicalInsuranceSelf",
        amount: 500,
        maxLimit: 25000,
      },
      {
        id: "124",
        category: "medicalInsuranceParent",
        amount: 5000,
        maxLimit: 50000,
      },
    ],
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
      return {
        ...state,
        section24: {
          ...state.section24,
          ...mapSection24Entry(state.section24, payload),
        },
        actionEntry: initialState.actionEntry,
      };
    }
    case DELETE_SECTION_24_ENTRY: {
      return {
        ...state,
        section24: {
          ...state.section24,
          ...mapSection24DeleteEntry(state.section24.options, payload),
        },
        actionEntry: initialState.actionEntry,
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
        deductionByChapter6: mapEditDeductionEntry(
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
