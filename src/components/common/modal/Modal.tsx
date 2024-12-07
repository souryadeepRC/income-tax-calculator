import { memo, ReactNode } from "react";
// library
import { Modal as MuiModal } from "@mui/material";
// styles
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <MuiModal open={isOpen} onClose={onClose}>
      <div className="modal__container">{children}</div>
    </MuiModal>
  );
};
export default memo(Modal);
