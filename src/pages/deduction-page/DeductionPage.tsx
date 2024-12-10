import { memo } from "react";
// library
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";
import { Box } from "@mui/material";
// icons
import BlurOnIcon from "@mui/icons-material/BlurOn";
// components
import { RouteLayout } from "src/components/common/CommonComponents";
import DataLayout from "src/components/layout/DataLayout";
// selectors
import { selectDeductionBreakup } from "src/store/deduction/deduction-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./DeductionPage.module.scss";
export const DeductionOption: React.FC = () => {
  const deductionBreakup = useSelector(selectDeductionBreakup);
  const options = [
    {
      label: "Rent",
      path: "rent",
      amount: `Rs. ${deductionBreakup.rentDeduction}`,
    },
    {
      label: "Section 24",
      path: "section-24",
      amount: `Rs. ${deductionBreakup.section24Deduction}`,
    },
    {
      label: "80C",
      path: "80C",
      amount: `Rs. ${deductionBreakup.deduction80C}`,
    },
    {
      label: "Chapter-VIA",
      path: "Chapter-VIA",
      amount: `Rs. ${deductionBreakup.deductionChapter6}`,
    },
  ];
  return (
    <section className={classes.deduction__container}>
      <ul className={classes.deduction_list}>
        {options.map((deductionOption) => {
          return (
            <li key={deductionOption.label}>
              <NavLink to={deductionOption.path}>
                <div className={classes.deduction_list__item}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <strong>{deductionOption.label}</strong>
                    <span>{deductionOption.amount}</span>
                  </Box>
                  <BlurOnIcon />
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

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
