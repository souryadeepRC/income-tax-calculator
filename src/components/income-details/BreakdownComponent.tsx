import { memo } from "react";
// library
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
// icons
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// components
import { Menu } from "src/components/common/CommonComponents";
// store
import {
  removeIncomeDetails,
  editIncomeEntry,
} from "src/store/income/income-actions";
// styles
import classes from "./IncomeBreakdown.module.scss";

interface BreakdownComponentProps {
  id: string;
  label: string;
  amount: number;
  category: "salary" | "extra";
}
const BreakdownComponent: React.FC<BreakdownComponentProps> = ({
  id,
  label,
  amount,
}) => {
  const dispatch = useDispatch();
  const onEdit = () => {
    dispatch(editIncomeEntry(id));
  };
  const onRemove = () => {
    dispatch(removeIncomeDetails(id));
  };
  return (
    <>
      <div key={label} className={classes.income_component}>
        <Box display="flex" flexDirection="column">
          <strong>{label}</strong>
          <span>Rs. {amount}</span>
        </Box>
        <Menu
          MenuIcon={<MoreVertIcon />}
          actions={[
            {
              label: "Modify",
              icon: <AppRegistrationIcon fontSize="small" />,
              onClick: onEdit,
            },
            {
              label: "Remove",
              icon: <DeleteIcon fontSize="small" />,
              onClick: onRemove,
            },
          ]}
        />
      </div>
    </>
  );
};
export default memo(BreakdownComponent);
