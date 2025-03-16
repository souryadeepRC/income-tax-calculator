import { memo } from "react";
// library
import { useDispatch } from "react-redux";
// components
import { Card, CardWrapper } from "src/components/common";
// store
import {
  deleteRentEntry,
  editRentEntry,
} from "src/store/deduction/deduction-actions";
// types
import { RentEntry as RentEntryType } from "src/types/deduction-types";
interface RentCollectionProps {
  collections: RentEntryType[];
}
const RentCollection: React.FC<RentCollectionProps> = ({ collections }) => {
  const dispatch = useDispatch();

  return (
    <CardWrapper>
      {collections?.map((rentEntry: RentEntryType, index: number) => {
        const { id = "", amount, duration, isMetroCity } = rentEntry;
        return (
          <Card
            key={id}
            editAction={() => dispatch(editRentEntry(id))}
            deleteAction={() => dispatch(deleteRentEntry(id))}
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
export default memo(RentCollection);
