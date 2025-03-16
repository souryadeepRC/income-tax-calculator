import { useMutation } from "@tanstack/react-query";
import { Button, ErrorMessage, InfiniteProgressBar, Modal } from "../common";
import dbService from "src/service/Database";
import classes from "./TaxDeduction.module.scss";

const DeductionEntryForm = ({
  children,
  isPending,
  isError,
  onCancel,
  onSave,
}: any) => {
  
  return (
    <Modal onClose={onCancel}>
      <form className={classes.deduction_entry__form}>
        <InfiniteProgressBar isLoading={isPending} />
        {isError && <ErrorMessage />}
        <>{children}</>
        <section
          className={classes.action_btn__container}
          aria-label="add rent entry form action button container"
        >
          <Button
            variant="text"
            data-testid="deduction-form-cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            data-testid="deduction-form-save-btn"
            className={classes.save__btn}
            onClick={onSave}
          >
            Save
          </Button>
        </section>
      </form>
    </Modal>
  );
};
export default DeductionEntryForm;
