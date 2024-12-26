import { memo, ReactNode } from "react";
// library
import { Modal as MuiModal } from "@mui/material";
// styles
import "./Modal.scss";
import { selectAppTheme } from "src/store/screen/screen-selectors";
import { useSelector } from "react-redux";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const appTheme = useSelector(selectAppTheme);
  return (
    <MuiModal data-testid="modal-container" data-theme={appTheme} open={isOpen} onClose={onClose}>
      <div className="modal__container">{children}</div>
    </MuiModal>
  );
};
export default memo(Modal);
