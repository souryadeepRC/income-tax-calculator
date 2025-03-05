import { memo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import AddIncome from "src/components/income-details/add-income/AddIncome";
import IncomeEditModal from "src/components/income-details/IncomeEditModal";
import IncomeHeader from "src/components/income-details/IncomeHeader";
import IncomeOptions from "src/components/income-details/IncomeOptions";
// reducers
import { resetEditIncomeEntry } from "src/store/income/income-actions";
import { selectIncome } from "src/store/income/income-selectors";

const IncomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { isEditable, editableEntryId } = useSelector(selectIncome);
  const handleEditIncomeReset = () => {
    dispatch(resetEditIncomeEntry());
  };

  return (
    <>
      {isEditable &&
        (editableEntryId ? (
          <IncomeEditModal onCancel={handleEditIncomeReset} />
        ) : (
          <AddIncome onCancel={handleEditIncomeReset} />
        ))}
      <IncomeHeader />
      <IncomeOptions />
    </>
  );
};
export default memo(IncomePage);
