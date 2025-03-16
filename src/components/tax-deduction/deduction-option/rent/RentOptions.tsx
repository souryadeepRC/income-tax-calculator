// library
import { useDispatch } from "react-redux";
// components
import { Card, CardWrapper } from "src/components/common";
import { DEDUCTION_TYPE } from "src/constants/common-constants";
// store
import {
  deleteDeduction,
  deleteRentEntry,
  editDeduction,
} from "src/store/deduction/deduction-actions";
// types
import { RentEntry as RentEntryType } from "src/types/deduction-types";

interface RentCollectionProps {
  options: RentEntryType[];
}
const RentOptions: React.FC<RentCollectionProps> = ({ options }) => {
  const dispatch = useDispatch();
  return (
    <CardWrapper>
      {options?.map((rentEntry: RentEntryType) => {
        const { id = "", amount, duration, isMetroCity } = rentEntry;
        return (
          <Card
            key={id}
            editAction={() =>
              dispatch(
                editDeduction({ type: DEDUCTION_TYPE.RENT, entryId: id })
              )
            }
            deleteAction={() =>
              dispatch(
                deleteDeduction({ type: DEDUCTION_TYPE.RENT, entryId: id })
              )
            }
            //deleteAction={() => dispatch(deleteRentEntry(id))}
            content={{
              amountLabel: `Rs. ${amount}`,
              title: `${duration} ${`Month${duration > 1 ? "s" : ""}`}`,
              description: isMetroCity ? "Metro" : "Non-Metro",
            }}
          />
        );
      })}
    </CardWrapper>
  );
};
export default RentOptions;
