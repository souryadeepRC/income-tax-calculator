import { memo, useState } from "react";
// library
import { Box, Tab, Tabs } from "@mui/material";
// styles
import { useDispatch, useSelector } from "react-redux";
import { setEditableIncomeDetails } from "src/store/income/income-actions";
import {
  selectExtraIncome,
  selectSalaryIncome,
} from "src/store/income/income-selectors";
import { IncomeComponent } from "src/types/income-types";
import { getIncomeBreakdown } from "src/utils/income-utils";
import classes from "./IncomeDetails.module.scss";
interface IncomeBreakdownProps {
  group: "salary" | "extra";
  dataSelector: any;
}

const IncomeBreakdown: React.FC<IncomeBreakdownProps> = ({
  group,
  dataSelector,
}) => {
  const dispatch = useDispatch();
  const breakdownIncomes = getIncomeBreakdown(group, useSelector(dataSelector));

  const onIncomeClick = (income: IncomeComponent) => () => {
    dispatch(setEditableIncomeDetails(income));
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

const IncomeDetails: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box width={"60%"}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={`Salary Income Rs. 30000`} />
          <Tab label={`Extra Income Rs. 20000`} />
        </Tabs>
      </Box>
      {value === 0 && (
        <IncomeBreakdown group="salary" dataSelector={selectSalaryIncome} />
      )}
      {value === 1 && (
        <IncomeBreakdown group="extra" dataSelector={selectExtraIncome} />
      )}
    </Box>
  );
};
export default memo(IncomeDetails);
