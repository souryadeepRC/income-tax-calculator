import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import { Button, TextField } from "@mui/material";
// actions
import { updateChapter6Deduction } from "src/store/deduction/deduction-actions";
// selectors
import { selectDeductionChapter6 } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/store/reducer-types";
import { DeductionByChapter6Type } from "src/types/deduction-types";
// styles
import "./deduction-element.scss";
type DeductionAmountType = {
  [key: string]: number;
};
export const DeductionChapter6 = () => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const deductionChapter6: DeductionByChapter6Type = useSelector(
    selectDeductionChapter6
  );
  // state
  const [deductionAmount, setDeductionAmount] = useState<DeductionAmountType>({
    medicalInsuranceSelf: 0,
    medicalInsuranceParent: 0,
    handicappedDependent: 0,
    specifiedDiseaseTreatment: 0,
    educationLoanInterest: 0,
    selfDisability: 0,
    additionalHomeLoanInterest: 0,
    additionalNps: 0,
    electricVehicleInterest: 0,
  });
  // effects
  useEffect(() => {
    setDeductionAmount(deductionChapter6);
  }, [deductionChapter6]);

  const onDeductionChange =
    (amountKey: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setDeductionAmount((deductionAmount: any) => {
        return {
          ...deductionAmount,
          [amountKey]: e.target.value,
        };
      });
    };

  const onSave = () => {
    let modifiedDeductedAmount: any = {};
    for (const key in deductionAmount) {
      modifiedDeductedAmount[key] = Number(deductionAmount[key]);
    }

    dispatch(updateChapter6Deduction(modifiedDeductedAmount));
  };

  const DEDUCTION_ITEMS: {
    label: string;
    amountKey: string;
    helperText?: string;
  }[] = [
    {
      label: "Medical Insurance Self/spouse/children - 80D",
      amountKey: "medicalInsuranceSelf",
      helperText: "Max 25,000",
    },
    {
      label: "Medical Insurance Parent - 80D",
      amountKey: "medicalInsuranceParent",
      helperText: "Max 50,000",
    },
    {
      label: "Handicapped Dependent - 80DD",
      amountKey: "handicappedDependent",
    },
    {
      label: "Specified Disease Treatment - 80DDB",
      amountKey: "specifiedDiseaseTreatment",
    },
    {
      label: "Education Loan Interest - 80E",
      amountKey: "educationLoanInterest",
    },
    {
      label: "Self Disability - 80U",
      amountKey: "selfDisability",
    },
    {
      label: "Additional Home Loan Interest - 80EEA/80EEB",
      amountKey: "additionalHomeLoanInterest",
      helperText: "Max 1,50,000",
    },
    {
      label: "Electric Vehicle Interest - 80EEB",
      amountKey: "electricVehicleInterest",
    },
    {
      label: "Additional Nps - 80CCD(2)/ 80CCD1B",
      amountKey: "additionalNps",
    },
  ];
  return (
    <section className="deduction__option">
      <section className="deduction__option-content">
        <section className="deduction__80c-items">
          {DEDUCTION_ITEMS.map((item, index) => {
            return (
              <TextField
                key={index}
                title={item.label}
                className="deduction__option__input"
                label={item.label}
                value={deductionAmount[item.amountKey]}
                onChange={onDeductionChange(item.amountKey)}
                type="number"
                helperText={item.helperText}
              />
            );
          })}
        </section>
      </section>
      <Button className="deduction__option__button" onClick={onSave}>
        Save
      </Button>
    </section>
  );
};
