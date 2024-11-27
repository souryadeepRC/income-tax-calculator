import { memo } from "react";
// library
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import { Menu } from "src/components/common/CommonComponents";
// actions
import { setEditableIncomeDetails } from "src/store/income/income-actions";
// types
import { IncomeComponent } from "src/types/income-types";
// utils
import { getIncomeBreakdown } from "src/utils/income-utils";
// styles
import classes from "./IncomeBreakdown.module.scss";
interface IncomeBreakdownProps {
  group: "salary" | "extra";
  dataSelector: any;
}

const IncomeBreakdown: React.FC<IncomeBreakdownProps> = ({
  group,
  dataSelector,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const breakdownIncomes = getIncomeBreakdown(group, useSelector(dataSelector));

  const onIncomeClick = (income: IncomeComponent) => () => {
    dispatch(setEditableIncomeDetails(income));
    navigate("/income/add-income");
  };
  return (
    <section className={classes.income_breakdown_container}>
      <section className={classes.income_breakdown_header}>
        <span className={classes.info}>
          Tap the icon to customize your component
        </span>
      </section>
      <section className={classes.income_component_container}>
        {breakdownIncomes.map((income: IncomeComponent, index: number) => {
          return (
            <div key={income.label} className={classes.income_component}>
              <Box display="flex" flexDirection="column">
                <strong>{income.label}</strong>
                <span>Rs. {income.amount}</span>
              </Box>
              <Menu
                MenuIcon={<MoreVertIcon />}
                actions={[
                  {
                    label: "Modify",
                    icon: <AppRegistrationIcon fontSize="small" />,
                    onClick: onIncomeClick(income),
                  },
                  {
                    label: "Remove",
                    icon: <DeleteIcon fontSize="small" />,
                    onClick: () => {},
                  },
                ]}
              />
            </div>
          );
        })}
      </section>
    </section>
  );
};
export default memo(IncomeBreakdown);
