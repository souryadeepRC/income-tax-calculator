import { memo } from "react";
import { FormControl, Select as MuiSelect, SelectProps } from "@mui/material";
// styles
import "./Select.scss";

const Select: React.FC<SelectProps> = (props) => {
  const { label, children, ...rest } = props;
  return (
    <FormControl fullWidth className="select__container">
      <label id="select-group-label">{label}</label>
      <MuiSelect {...rest}>{children}</MuiSelect>
    </FormControl>
  );
};
export default memo(Select);
