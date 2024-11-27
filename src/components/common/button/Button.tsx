import { ButtonProps, Button as MuiButton } from "@mui/material";
import { memo } from "react";
import "./Button.scss";
const Button: React.FC<ButtonProps> = (props) => {
  const { className, ...rest } = props;
  return <MuiButton className={`btn ${className}`} {...rest} />;
};
export default memo(Button);
