import { memo } from "react";
// library
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
// components
import { RouteLayout } from "src/components/common/CommonComponents";
import DataLayout from "src/components/layout/DataLayout";
// selectors
import { selectDeductionBreakup } from "src/store/deduction/deduction-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";

const DeductionPage: React.FC = () => {
  const deductionBreakup = useSelector(selectDeductionBreakup);
  return (
    <DataLayout
      headerText="Overall Exempted Deduction"
      aggregateAmount={formatNumber(deductionBreakup.total)}
    >
      <RouteLayout parentPath="deduction" label="">
        <Outlet />
      </RouteLayout>
    </DataLayout>
  );
};
export default memo(DeductionPage);
