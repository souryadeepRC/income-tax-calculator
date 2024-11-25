import { memo, useState } from "react";
// library
import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
// components
import { Button } from "src/components/common/CommonComponents";
// icons
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
// actions
import { modifyIncomeDetails } from "src/store/income/income-actions";
// types
import { IncomeComponent } from "src/types/income-types";
// styles
import classes from './AddIncome.module.scss';

const AddIncome: React.FC = () => {
  const dispatch = useDispatch();
  const [incomeDetails, setIncomeDetails] = useState<IncomeComponent>({
    label: "",
    amount: "",
    group: "salary",
  });
  const onTextChange =
    (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setIncomeDetails((incomeDetails) => {
        return {
          ...incomeDetails,
          [type]: event.target.value,
        };
      });
    };
  const onChange = (event: SelectChangeEvent) => {
    setIncomeDetails((incomeDetails) => {
      return {
        ...incomeDetails,
        group: event.target.value as "salary" | "extra",
      };
    });
  };
  const onAddIncome = () => {
    dispatch(modifyIncomeDetails(incomeDetails));
  };
  const { label, amount, group } = incomeDetails;
  return (
    <section className={classes.add_income__container}>
      <TextField
        label="Income label"
        fullWidth
        value={label}
        onChange={onTextChange("label")}
      />
      <TextField
        label="Amount"
        fullWidth
        value={amount}
        onChange={onTextChange("amount")}
      />
      <Select
        fullWidth
        id="demo-simple-select-standard"
        value={group}
        onChange={onChange}
      >
        <MenuItem value="salary">Salary income</MenuItem>
        <MenuItem value="extra">Extra Income</MenuItem>
      </Select>
      <Button startIcon={<DataSaverOnIcon />} onClick={onAddIncome}>
        Add
      </Button>
    </section>
  );
};
export default memo(AddIncome);
