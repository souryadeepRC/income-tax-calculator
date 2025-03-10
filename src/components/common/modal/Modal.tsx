import { memo, ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectAppTheme } from "src/store/screen/screen-selectors";
// styles
import "./Modal.scss";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const appTheme = useSelector(selectAppTheme);
  return (
    <div
      data-testid="modal-container"
      data-theme={appTheme}
      className="modal__container"
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default memo(Modal);
