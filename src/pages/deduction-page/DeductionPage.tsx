import { memo } from "react";
// library
import { useSelector } from "react-redux";
import { NavLink, Route, Routes } from "react-router-dom";
// icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BlurOnIcon from '@mui/icons-material/BlurOn';
// components
import { RouteLayout } from "src/components/common/CommonComponents";
import { Deduction80C } from "src/components/income-tax-calculation/income-tax-deduction/80C/Deduction80C";
import { DeductionChapter6 } from "src/components/income-tax-calculation/income-tax-deduction/DeductionChapter6";
import { Rent } from "src/components/income-tax-calculation/income-tax-deduction/rent/Rent";
import { Section24 } from "src/components/income-tax-calculation/income-tax-deduction/section24/Section24";
import DataLayout from "src/components/layout/DataLayout";
// selectors
import { selectDeductionBreakup } from "src/store/deduction/deduction-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./DeductionPage.module.scss";
import { Box } from "@mui/material";
const DeductionOption: React.FC = () => {
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
                  <Box display="flex" flexDirection="column" alignItems="flex-start">
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
      <Routes>
        <Route path="" element={<DeductionOption />} />
        <Route
          path="rent"
          element={
            <RouteLayout
              parentPath="deduction"
              label={`Deduction By Rent [availed: Rs. ${deductionBreakup.rentDeduction}]`}
            >
              <Rent />
            </RouteLayout>
          }
        />
        <Route
          path="section-24"
          element={
            <RouteLayout
              parentPath="deduction"
              label={`Deduction By Section 24 [availed: Rs. ${deductionBreakup.section24Deduction}]`}
            >
              <Section24 />
            </RouteLayout>
          }
        />
        <Route
          path="80C"
          element={
            <RouteLayout
              parentPath="deduction"
              label={`Deduction By 80C [availed: Rs. ${deductionBreakup.deduction80C}]`}
            >
              <Deduction80C />
            </RouteLayout>
          }
        />
        <Route
          path="Chapter-VIA"
          element={
            <RouteLayout
              parentPath="deduction"
              label={`Deduction By Chapter VI [availed: Rs. ${deductionBreakup.deductionChapter6}]`}
            >
              <DeductionChapter6 />
            </RouteLayout>
          }
        />
      </Routes>
    </DataLayout>
  );
};
export default memo(DeductionPage);
