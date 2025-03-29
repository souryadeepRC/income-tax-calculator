import { useSelector } from "react-redux";
import { DEDUCTION_TYPE } from "src/constants/common-constants";
import { selectDeductionActionEntry } from "src/store/deduction/deduction-selectors";
import { ActionEntry, DeductionType } from "src/types/deduction-types";

type DeductionActionEntry = {
  entryId: string | undefined;
  isEditable: boolean;
  isDelete: boolean;
};
const useDeductionActionEntry = (type: DeductionType): DeductionActionEntry => {
  const actionEntry: ActionEntry = useSelector(selectDeductionActionEntry);

  if (actionEntry.type === type) {
    return {
      entryId: actionEntry.entryId,
      isEditable: actionEntry.isEditable,
      isDelete: actionEntry.isDelete,
    };
  }
  return {
    entryId: undefined,
    isEditable: false,
    isDelete: false,
  };
};
export default useDeductionActionEntry;
