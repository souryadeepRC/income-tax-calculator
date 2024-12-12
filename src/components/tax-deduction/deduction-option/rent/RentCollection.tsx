import { memo } from "react";
// components
import RentEntry from "./RentEntry";
// types
import { RentEntry as RentEntryType } from "src/types/deduction-types";

interface RentCollectionProps {
  collections: RentEntryType[];
}
const RentCollection: React.FC<RentCollectionProps> = ({ collections }) => {
  return (
    <>
      {collections?.map((rentEntry: RentEntryType) => {
        return <RentEntry key={rentEntry.id} details={rentEntry} />;
      })}
    </>
  );
};
export default memo(RentCollection);
