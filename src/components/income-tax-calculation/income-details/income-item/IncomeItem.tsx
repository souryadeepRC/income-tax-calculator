import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// icons
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
// library
import Input from "@mui/material/Input";
// actions
import { update80CDeduction } from "src/store/deduction/deduction-actions";
import { updateIncomeDetails } from "src/store/income/income-actions";
// selectors
// types
import { AppDispatch } from "src/store/reducer-types";
// styles
import "./IncomeItem.scss";
interface IncomeItemProps {
  label: string;
  type: string;
  selectAmount: any;
}
export const IncomeItem = ({ label, type, selectAmount }: IncomeItemProps) => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const amount: number = useSelector(selectAmount);
  // state
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [income, setIncome] = useState<string>(`${amount}`);

  // event fns
  const onSave = (): void => {
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
  const onIncomeChange = (e: any): void => {
    setIncome(e.target.value);
  };
  return (
    <div className="income-item__container">
      <span className="header-text">{label}</span>
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
