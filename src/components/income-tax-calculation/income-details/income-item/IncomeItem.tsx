import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import { EditIcon, SaveIcon } from "../../../../icons";
import { Input } from "../../../../library";
// actions
import { updateIncomeDetails } from "src/store/income/income-actions";
// selectors
// types
import { AppDispatch } from "src/store/reducer-types";
// styles
import { update80CDeduction } from "src/store/deduction/deduction-actions";
import "./IncomeItem.scss";
interface IncomeItemProps {
  label: string;
  type: string;
  subLabel?: string;
  selectAmount: any;
}
export const IncomeItem = ({
  label,
  type,
  subLabel,
  selectAmount,
}: IncomeItemProps) => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const amount: number = useSelector(selectAmount);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [income, setIncome] = useState<string>(`${amount}`);

  // event fns
  const onSave = () => {
    setIsEditMode(false);
    dispatch(
      updateIncomeDetails({
        type,
        amount: +income,
      })
    );
    if (type === "pf") {
      dispatch(update80CDeduction({ providentFund: +income }));
    }
  };
  const onIncomeChange = (e: any) => {
    setIncome(e.target.value);
  };
  return (
    <div className="income-item__container">
      <div className="income-item__header">
        <span className="header-text">{label}</span>
        <span className="header-sub-text">{subLabel}</span>
      </div>
      <div className="amount__container">
        <span>Rs.</span>
        {isEditMode ? (
          <div className="amount-edit">
            <Input value={income} onChange={onIncomeChange} />
            <SaveIcon className="save-icon" onClick={onSave} />
          </div>
        ) : (
          <div className="amount-view">
            <span>{income}</span>
            <EditIcon
              className="edit-icon"
              onClick={() => setIsEditMode(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
