import { memo } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// components
import {
  AddIncome,
  EditIncome,
  IncomeHeader,
  IncomeOptions,
} from "src/components/income-details";
import { Modal } from "src/components/common/CommonComponents";
// store
import { resetEditIncomeEntry } from "src/store/income/income-actions";
import { selectIncome } from "src/store/income/income-selectors";
import DeleteIncome from "src/components/income-details/DeleteIncome";

const IncomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { isEditable, editableEntryId } = useSelector(selectIncome);
  const handleEditIncomeReset = () => {
    dispatch(resetEditIncomeEntry());
  };

  return (
    <>
      {isEditable && (
        <Modal onClose={handleEditIncomeReset}>
          {editableEntryId ? <EditIncome /> : <AddIncome />}
        </Modal>
      )}
      <DeleteIncome />
      <IncomeHeader />
      <IncomeOptions />
    </>
  );
};
export default memo(IncomePage);
