import { memo } from "react";
// library
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { Box } from "@mui/material";
// icons
import BlurOnIcon from "@mui/icons-material/BlurOn";
// selectors
import { selectDeductionBreakup } from "src/store/deduction/deduction-selectors";
// styles
import classes from "./DeductionPage.module.scss";

const DeductionOption: React.FC = () => {
  const deductionBreakup = useSelector(selectDeductionBreakup);
  const options = [
    {
      label: "Rent",
      path: "rent",
      amount: `Rs. ${deductionBreakup.rentDeduction}`,
    },
    {
      label: "Section 24 (Home Loan Interest Deduction)",
      path: "section-24",
      amount: `Rs. ${deductionBreakup.deductionSection24}`,
    },
    {
      label: "Section 80C (Deductions for Investments)",
      path: "80C",
      amount: `Rs. ${deductionBreakup.deduction80C}`,
    },
    {
      label: "Chapter VI-A (Various Deductions like 80D, 80G, etc.)",
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
export default memo(DeductionOption);
