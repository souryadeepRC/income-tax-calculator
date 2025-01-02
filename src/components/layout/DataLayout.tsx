import React, { memo } from "react";
// styles
import classes from "./DataLayout.module.scss";
interface DataLayoutProps {
  headerText: string;
  aggregateAmount?: number;
  children: React.ReactNode;
}
const DataLayout: React.FC<DataLayoutProps> = ({
  headerText,
  aggregateAmount = 0,
  children,
}) => (
  <section className={classes.data_layout__container}>
    <section className={classes.data_layout__header}>
      <strong data-testid="layout-header">{headerText}</strong>
      {aggregateAmount > 0 && (
        <strong data-testid="layout-amount">Rs. {aggregateAmount}</strong>
      )}
    </section>
    {children}
  </section>
);
export default memo(DataLayout);
