import { memo, ReactNode } from "react";
// library
import { Box } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
// components
import { Button, Modal } from "src/components/common/CommonComponents";
// styles
import classes from "./IncomeBreakdown.module.scss";
// styles
interface ConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  content: string | ReactNode;
}
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  content,
}) => {
  const onSave = () => {
    onConfirm();
    onCancel();
  };
  return (
    <Modal isOpen={true} onClose={onCancel}>
      <Box className={classes.income_edit__container}>
        {content}

        <Box display="flex" gap={2} flexWrap="wrap">
          <Button onClick={onSave} startIcon={<SaveIcon fontSize="small" />}>
            Yes, Go Ahead
          </Button>
          <Button
            onClick={onCancel}
            startIcon={<CancelIcon fontSize="small" />}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default memo(ConfirmationModal);
