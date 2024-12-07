// types
import { ReducerActionPayloadType } from "src/store/reducer-types";
import { DeductionReducerType } from "src/types/deduction-types";
// constants
import {
  RESET_EDIT_RENT_ENTRY,
  EDIT_RENT_ENTRY,
  SAVE_RENT_ENTRY,
  DELETE_RENT_ENTRY,
  UPDATE_80C_DEDUCTION,
  UPDATE_CHAPTER_6_DEDUCTION,
  UPDATE_RENT_DEDUCTION,
  UPDATE_SECTION_24_DEDUCTION,
  SET_RENT_DEDUCTED_AMOUNT,
} from "src/store/deduction/deduction-constants";
import {
  mapDeleteRentEntry,
  mapEditRentEntry,
  mapSaveRentEntry,
} from "./mapper/deduction-rent-mapper";

const initialState: DeductionReducerType = {
  standardDeduction: { newScheme: 75000, oldScheme: 50000 },
  rent: {
    collections: [],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
  section24: 0,
  deduction80C: {
    providentFund: 46620,
    lic: 0,
    nps: 0,
    ppf: 0,
    homeLoanPrincipal: 0,
    stampDuty: 0,
    taxSavingFD: 0,
    others: 0,
  },
  deductionByChapter6: {
    medicalInsuranceSelf: 0,
    medicalInsuranceParent: 0,
    handicappedDependent: 0,
    specifiedDiseaseTreatment: 0,
    educationLoanInterest: 0,
    selfDisability: 0,
    additionalHomeLoanInterest: 0,
    additionalNps: 0,
    electricVehicleInterest: 0,
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
        section24: payload,
      };
    }
    case UPDATE_80C_DEDUCTION: {
      return {
        ...state,
        deduction80C: {
          ...state.deduction80C,
          ...payload,
        },
      };
    }
    case UPDATE_CHAPTER_6_DEDUCTION: {
      return {
        ...state,
        deductionByChapter6: payload,
      };
    }
    default:
      return state;
  }
};
export { DeductionReducer };
