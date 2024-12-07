import { memo } from "react";
// library
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
// styles
import "./TextField.scss";

const TextField = (props: TextFieldProps) => {
  const { label, className = "", ...rest } = props;
  return (
    <div className="text_field__container">
      <label className="text_field__header">{label}</label>
      <MuiTextField className={`text_field__input ${className}`} {...rest} />
    </div>
  );
};
export default memo(TextField);
