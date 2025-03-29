import { useEffect, useState } from "react";
// library
import { useToggle } from "triva-ui";
import PlusIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
// components
import { Button } from "src/components/common";
// style
import "./ToggleView.scss";

interface ToggleViewProps {
  header: string;
  children: React.ReactElement | React.ReactElement[];
}
const ToggleView: React.FC<ToggleViewProps> = ({ header, children }) => {
  const [isVisible, toggleVisibility] = useToggle(false);
  const [contentClass, setContentClass] = useState("");

  useEffect(() => {
    if (contentClass) {
      setTimeout(() => {
        toggleVisibility();
        setContentClass("");
      }, 500);
    }
  }, [contentClass]);

  const handleToggleClick = () => {
    if (isVisible) {
      setContentClass("hidden");
      return;
    }

    toggleVisibility();
  };
  return (
    <div className="toggle_view__container">
      <div className="toggle__header" role="button" onClick={handleToggleClick}>
        <h4 className="title">{header}</h4>
        <Button variant="text">
          {isVisible ? <MinusIcon /> : <PlusIcon />}
        </Button>
      </div>
      {isVisible && (
        <div className={`toggle__content ${contentClass}`}>{children}</div>
      )}
    </div>
  );
};
export default ToggleView;
