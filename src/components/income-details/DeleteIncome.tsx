import { useEffect } from "react";
// library
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
// components
import {
  ErrorMessage,
  Modal,
  Button,
  InfiniteProgressBar,
} from "src/components/common/CommonComponents";
// service
import dbService from "src/service/Database";
// store
import {
  deleteIncomeEntry,
  removeIncomeDetails,
} from "src/store/income/income-actions";
import { selectDeleteIncomeEntry } from "src/store/income/income-selectors";
// styles
import classes from "./IncomeDetails.module.scss";

const DeleteIncome: React.FC = () => {
  const dispatch = useDispatch();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id: string) => dbService.deleteDetails("income", id),
  });
  const { id = "", category = "" } = useSelector(selectDeleteIncomeEntry) || {};

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(removeIncomeDetails(id));
  }, [isSuccess]);

  const onCancel = () => {
    dispatch(deleteIncomeEntry(undefined));
  };
  const onRemove = () => {
    mutate(id);
  };

  if (!id) return <></>;
  return (
    <Modal onClose={onCancel}>
      <div className={classes.income_delete__container}>
        <InfiniteProgressBar isLoading={isPending} />
        {isError && <ErrorMessage />}
        <div className={classes.delete__message}>
          <h1>
            Are you sure you want to Delete&nbsp;
            <span>{category}</span>&nbsp;Income?
          </h1>
        </div>
        <div className={classes.action__buttons}>
          <Button
            variant="contained"
            border="round"
            className="btn-home"
            onClick={onRemove}
          >
            Yes,&nbsp;Remove
          </Button>
          <Button variant="text" className="btn-login" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteIncome;
