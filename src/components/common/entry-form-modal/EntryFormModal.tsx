// components
import {
  Button,
  ErrorMessage,
  InfiniteProgressBar,
  Modal,
} from "src/components/common";
// styles
import "./EntryFormModal.scss";

interface EntryFormModalProps {
  ariaLabel?: string;
  children: React.ReactElement[] | React.ReactElement;
  isPending: boolean;
  isError: boolean;
  onCancel: () => void;
  onSave: () => void;
  saveBtnLabel?: string;
  className?: string;
}
const EntryFormModal: React.FC<EntryFormModalProps> = ({
  ariaLabel = "Entry form modal",
  children,
  isPending,
  isError,
  onCancel,
  onSave,
  saveBtnLabel = "Save",
  className = "",
}: any) => {
  return (
    <Modal onClose={onCancel}>
      <form className={`entry__form ${className}`}>
        <InfiniteProgressBar isLoading={isPending} />
        {isError && <ErrorMessage />}
        <div className="form_input__container">{children}</div>
        <section className="action_btn__container" aria-label={ariaLabel}>
          <Button
            variant="text"
            disabled={isPending}
            data-testid="deduction-form-cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            border="round"
            disabled={isPending}
            data-testid="deduction-form-save-btn"
            onClick={onSave}
          >
            {saveBtnLabel}
          </Button>
        </section>
      </form>
    </Modal>
  );
};
export default EntryFormModal;
