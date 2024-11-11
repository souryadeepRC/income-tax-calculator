// types
import { ReducerActionPayloadType } from "src/store/reducer-types";
import { DeductionReducerType } from "src/types/deduction-types";
// constants
import {
  UPDATE_80C_DEDUCTION,
  UPDATE_CHAPTER_6_DEDUCTION,
  UPDATE_RENT_DEDUCTION,
  UPDATE_SECTION_24_DEDUCTION,
} from "src/store/deduction/deduction-constants";

const initialState: DeductionReducerType = {
  standardDeduction: { newScheme: 75000, oldScheme: 50000 },
  rent: {
    amount: 0,
    duration: 12,
    isMetroCity: true,
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

