import { memo } from "react";
// library
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
// actions
import { setEditableIncomeDetails } from "src/store/income/income-actions";
// types
import { IncomeComponent } from "src/types/income-types";
// utils
import { getIncomeBreakdown } from "src/utils/income-utils";
// styles
import classes from "./IncomeBreakdown.module.scss";
interface IncomeBreakdownProps {
  amount?: number;
  group: "salary" | "extra";
  dataSelector: any;
}

const IncomeBreakdown: React.FC<IncomeBreakdownProps> = ({
  amount,
  group,
  dataSelector,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const breakdownIncomes = getIncomeBreakdown(group, useSelector(dataSelector));

  const onIncomeClick = (income: IncomeComponent) => () => {
    dispatch(setEditableIncomeDetails(income));
    navigate("/income/add-income")
  };
  return (
    <section className={classes.income_breakdown_container}>
      {breakdownIncomes.map((income: IncomeComponent, index: number) => {
        return (
          <div
            key={income.label}
            className={classes.item_container}
            onClick={onIncomeClick(income)}
          >
            <Box className={classes.item_inner__container}>
              <Box
                display="flex"
                flexDirection="column"
                padding={"0 1vw"}
                width={"80%"}
              >
                <strong>{income.label}</strong>
                <span>Rs. {income.amount}</span>
              </Box>
            </Box>
          </div>
        );
      })}
    </section>
  );
};
export default memo(IncomeBreakdown);
