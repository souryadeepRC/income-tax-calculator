import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import { Button, TextField } from "@mui/material";
// actions
import { update80CDeduction } from "src/store/deduction/deduction-actions";
// selectors
import { selectDeduction80C } from "src/store/deduction/deduction-selectors";
// types
import { AppDispatch } from "src/store/reducer-types";
import { Deduction80CType } from "src/types/deduction-types";
// styles
import "../deduction-element.scss";
type DeductionAmountType = {
  [key: string]: number;
};
export const Deduction80C = () => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const deduction80C: Deduction80CType = useSelector(selectDeduction80C);
  // state
  const [deductionAmount, setDeductionAmount] = useState<DeductionAmountType>({
    providentFund: 0,
    lic: 0,
    nps: 0,
    ppf: 0,
    homeLoanPrincipal: 0,
    stampDuty: 0,
    taxSavingFD: 0,
    others: 0,
  });
  // effects
  useEffect(() => {
    setDeductionAmount(deduction80C);
  }, [deduction80C]);

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
    dispatch(
      update80CDeduction({
        providentFund: Number(deductionAmount.providentFund),
        lic: Number(deductionAmount.lic),
        nps: Number(deductionAmount.nps),
        ppf: Number(deductionAmount.ppf),
        homeLoanPrincipal: Number(deductionAmount.homeLoanPrincipal),
        stampDuty: Number(deductionAmount.stampDuty),
        taxSavingFD: Number(deductionAmount.taxSavingFD),
        others: Number(deductionAmount.others),
      })
    );
  };

  const DEDUCTION_ITEMS: { label: string; amountKey: string }[] = [
    {
      label: "Provident Fund",
      amountKey: "providentFund",
    },
    {
      label: "LIC",
      amountKey: "lic",
    },
    {
      label: "Nation Pension Scheme",
      amountKey: "nps",
    },
    {
      label: "PPF",
      amountKey: "ppf",
    },
    {
      label: "Home Loan Principal",
      amountKey: "homeLoanPrincipal",
    },
    {
      label: "Stamp Duty",
      amountKey: "stampDuty",
    },
    {
      label: "Tax Saving FD",
      amountKey: "taxSavingFD",
    },
    {
      label: "Others(VPF,NSC etc.)",
      amountKey: "others",
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
                className="deduction__option__input"
                label={item.label}
                value={deductionAmount[item.amountKey]}
                onChange={onDeductionChange(item.amountKey)}
                type="number"
              />
            );
          })}
        </section>
      </section>
      <Button className="deduction__option__button" onClick={onSave}>
        Save [Total maximum exemption: Rs. 1,50,000]
      </Button>
    </section>
  );
};
