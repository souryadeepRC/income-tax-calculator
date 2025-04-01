import { memo } from "react";
import { FormControl, Select as MuiSelect, SelectProps } from "@mui/material";
// styles
import "./Select.scss";

const Select: React.FC<any> = (props) => {
  const { label, children, errorMessage = "", ...rest } = props;
  return (
    <FormControl fullWidth className="select__container">
      <label id="select-group-label">{label}</label>
      <MuiSelect {...rest}>{children}</MuiSelect>
      {errorMessage && <span className="error">{errorMessage}</span>}
    </FormControl>
  );
};
export default memo(Select);
