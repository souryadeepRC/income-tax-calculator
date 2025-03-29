import { useMemo } from "react";
// library
import { useSelector } from "react-redux";
// components
import {
  AddIncome,
  EditIncome,
  IncomeHeader,
  IncomeOptions,
} from "src/components/income-details";
import DeleteIncome from "src/components/income-details/DeleteIncome";
// store
import {
  selectIncomeActionEntry,
  selectIncomeOptions,
} from "src/store/income/income-selectors";

const IncomePage: React.FC = () => {
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
export default IncomePage;
