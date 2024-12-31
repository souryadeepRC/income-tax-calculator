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
      {collections?.map((rentEntry: RentEntryType, index: number) => {
        return <RentEntry key={index} details={rentEntry} />;
      })}
    </>
  );
};
export default memo(RentCollection);
