import { memo } from "react";
// styles
import classes from "./DataLayout.module.scss";
interface DataLayoutProps {
  headerText: string;
  aggregateAmount?: number;
  children: any;
}
const DataLayout: React.FC<DataLayoutProps> = ({
  headerText,
  aggregateAmount,
  children,
}) => {
  return (
    <section className={classes.data_layout__container}>
      <section className={classes.data_layout__header}>
        <strong>{headerText}</strong>
        {aggregateAmount && <strong>Rs. {aggregateAmount}</strong>}
      </section>
      {children}
    </section>
  );
};
export default memo(DataLayout);
