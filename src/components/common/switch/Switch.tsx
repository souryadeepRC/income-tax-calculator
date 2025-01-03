import { memo } from "react";
// styles
import "./Switch.scss";

interface SwitchProps {
  checked: boolean;
  className?: string;
  onChange: () => void;
}
const Switch: React.FC<SwitchProps> = ({
  checked,
  className = "",
  onChange,
}) => (
  <div className={`Switch-root ${className}`}>
    <label className={`Switch-switchBase ${checked ? "Switch-checked" : ""}`}>
      <input
        className="Switch-input"
        type="checkbox"
        onChange={onChange}
        checked={checked}
        aria-label="toggle switch"
      />
      <span className="Switch-thumb"></span>
    </label>
    <span className="Switch-track"></span>
  </div>
);

export default memo(Switch);
