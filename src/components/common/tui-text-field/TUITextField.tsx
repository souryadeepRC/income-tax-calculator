import "./TUITextField.css";
import { TUITextFieldProps } from "./types";

const TUITextField = (props: TUITextFieldProps) => {
  const {
    label,
    type = "text",
    className = "",
    errorMessage,
    helperText,
    inputProps,
    dataTestId,
    id,
    value,
    onChange,
    fullWidth,
    ...rest
  } = props || {};
  const isError: boolean = errorMessage !== "";
  return (
    <div
      id={id}
      className={`TUIText_field__container ${className} ${isError ? "TUIText__error" : ""} 
      ${fullWidth ? "TUIText__fullWidth" : ""}`}
      data-testid={dataTestId || "tui-text-field"}
    >
      <label>{label}</label>
      {helperText && <span className="helper__text">{helperText}</span>}
      <input
        {...inputProps}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {errorMessage && <span className="error__msg">{errorMessage}</span>}
    </div>
  );
};
export default TUITextField;
