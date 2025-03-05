import "./Button.scss";
import { SvgIconProps } from "src/types/common-types";

type ButtonVariant = "outlined" | "contained" | "text";
type ButtonBorder = "round" | "square" | "oval";
interface CustomButtonProps {
  className?: string;
  tabIndex?: number;
  label?: string;
  variant: ButtonVariant;
  children: JSX.Element | string;
  startIcon?: SvgIconProps;
  border?: ButtonBorder;
  endIcon?: SvgIconProps;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<CustomButtonProps> = (props) => {
  const {
    className,
    tabIndex = 0,
    children,
    startIcon: StartIcon,
    endIcon: EndIcon,
    label,
    border,
    onClick,
    variant,
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick?.(event);
  };
  return (
    <button
      tabIndex={tabIndex}
      aria-label={label}
      data-testid={`${label}-btn`}
      className={`Button-root ${variant || ""} ${border || ""} ${className || ""}`}
      onClick={handleClick}
    >
      {StartIcon && <>{StartIcon}</>}
      {children}
      {EndIcon && <>{EndIcon}</>}
    </button>
  );
};
export default Button;
