// library
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
// components
import {
  ErrorMessage,
  Modal,
  Button,
  InfiniteProgressBar,
  EntryFormModal,
} from "src/components/common";
// service
import dbService from "src/service/Database";
// store
import { resetDeductionAction } from "src/store/deduction/deduction-actions";
// styles
import classes from "./TaxDeduction.module.scss";

interface DeleteDeductionProps {
  title: string;
  entryId: string;
  onDelete: () => void;
}
const DeleteDeduction: React.FC<DeleteDeductionProps> = ({
  title,
  entryId,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (id: string) => dbService.deleteDetails("deduction", id),
    onSuccess: onDelete,
  });

  const onCancel = () => {
    dispatch(resetDeductionAction());
  };
  const onRemove = () => {
    mutate(entryId);
  };

  return (
    <EntryFormModal
      isPending={isPending}
      isError={isError}
      onSave={onRemove}
      onCancel={onCancel}
      saveBtnLabel="Yes, Remove"
    >
      <div className={classes.deduction_delete__container}>
        <InfiniteProgressBar isLoading={isPending} />
        {isError && <ErrorMessage />}
        <div className={classes.delete__message}>
          <h1>
            Are you sure you want to Delete this&nbsp;<span>{title}</span>
            &nbsp;deduction?
          </h1>
        </div>
      </div>
    </EntryFormModal>
  );
};
export default DeleteDeduction;
