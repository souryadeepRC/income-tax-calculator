import { memo, useState } from "react";
// library
import { Box } from "@mui/material";
// icons
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// components
import { Menu } from "src/components/common/CommonComponents";
import IncomeEditModal from "./IncomeEditModal";
// styles
import { useDispatch } from "react-redux";
import {
  removeIncomeDetails,
  saveIncomeDetails,
} from "src/store/income/income-actions";
import classes from "./IncomeBreakdown.module.scss";
interface BreakdownComponentProps {
  id: string;
  label: string;
  amount: number;
  category: "salary" | "extra";
}
const BreakdownComponent: React.FC<BreakdownComponentProps> = ({
  id,
  category,
  label,
  amount,
}) => {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const onEdit = (amount: string) => {
    dispatch(saveIncomeDetails({ label, category, amount: +amount }));
  };
  const onRemove = () => {
    dispatch(removeIncomeDetails(id));
  };
  return (
    <>
      {isEditable && (
        <IncomeEditModal
          isEditable={isEditable}
          onClose={() => setIsEditable(false)}
          label={label}
          amount={`${amount}`}
          onEdit={onEdit}
        />
      )}
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
              onClick: () => setIsEditable(true),
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
