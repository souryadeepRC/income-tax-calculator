// library
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
// components
import { EntryFormModal } from "src/components/common";
// service
import dbService from "src/service/Database";
// store
import {
  removeIncomeDetails,
  resetActionIncomeEntry,
} from "src/store/income/income-actions";
// types
import { IncomeOption } from "src/types/income-types";
// styles
import classes from "./IncomeDetails.module.scss";

interface DeleteIncomeProps {
  entry: IncomeOption;
}
const DeleteIncome: React.FC<DeleteIncomeProps> = ({ entry }) => {
  const dispatch = useDispatch();
  const { id, category } = entry;

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id: string) => dbService.deleteDetails("income", id),
    onSuccess: () => {
      dispatch(removeIncomeDetails(id));
    },
  });

  const onCancel = () => {
    dispatch(resetActionIncomeEntry());
  };
  const onRemove = () => {
    mutate(id);
  };

  return (
    <EntryFormModal
      isPending={isPending}
      isError={isError}
      onCancel={onCancel}
      onSave={onRemove}
      saveBtnLabel="Yes, Remove"
    >
      <div className={classes.income_delete__container}>
        <div className={classes.delete__message}>
          <h1>
            Are you sure you want to Delete&nbsp;
            <span>{category}</span>&nbsp;Income?
          </h1>
        </div>
      </div>
    </EntryFormModal>
  );
};
export default DeleteIncome;
