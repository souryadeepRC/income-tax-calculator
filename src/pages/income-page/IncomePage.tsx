import { memo, useMemo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import {
  AddIncome,
  EditIncome,
  IncomeHeader,
  IncomeOptions,
} from "src/components/income-details";
// store
import { resetEditIncomeEntry } from "src/store/income/income-actions";
import {
  selectIncomeActionEntry,
  selectIncomeOptions,
} from "src/store/income/income-selectors";
import DeleteIncome from "src/components/income-details/DeleteIncome";

const IncomePage: React.FC = () => {
  const dispatch = useDispatch();
  const options = useSelector(selectIncomeOptions);
  const { isEditable, entryId, isDelete } = useSelector(
    selectIncomeActionEntry
  );
  const actionEntry = useMemo(() => {
    return options.find((option) => option.id === entryId);
  }, [isDelete, isEditable]);

  return (
    <>
      {isEditable &&
        (entryId && actionEntry ? (
          <EditIncome entry={actionEntry} />
        ) : (
          <AddIncome />
        ))}
      {isDelete && actionEntry && <DeleteIncome entry={actionEntry} />}
      <IncomeHeader />
      <IncomeOptions options={options} />
    </>
  );
};
export default memo(IncomePage);
