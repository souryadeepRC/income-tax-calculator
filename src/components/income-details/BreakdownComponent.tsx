import { memo, useState } from "react";
// library
import { Box } from "@mui/material";
// icons
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// components
import { Menu } from "src/components/common/CommonComponents";
import ConfirmationModal from "./ConfirmationModal";
import IncomeEditModal from "./IncomeEditModal";
// styles
import { useDispatch } from "react-redux";
import {
  modifyIncomeDetails,
  removeIncomeDetails,
} from "src/store/income/income-actions";
import classes from "./IncomeBreakdown.module.scss";
interface BreakdownComponentProps {
  label: string;
  amount: string;
  group: "salary" | "extra";
}
const BreakdownComponent: React.FC<BreakdownComponentProps> = ({
  group,
  label,
  amount,
}) => {
  const dispatch = useDispatch();
  const [isRemove, setIsRemove] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const onEdit = (amount: string) => {
    dispatch(modifyIncomeDetails({ label, group, amount }));
  };
  const onRemove = () => {
    dispatch(removeIncomeDetails({ group, label }));
  };
  return (
    <>
      {isRemove && (
        <ConfirmationModal
          content={`Do you want to delete ${label} component from ${group} Income`}
          onConfirm={onRemove}
          onCancel={() => setIsRemove(false)}
        />
      )}
      {isEditable && (
        <IncomeEditModal
          isEditable={isEditable}
          onClose={() => setIsEditable(false)}
          label={label}
          amount={amount}
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
              onClick: () => setIsRemove(true),
            },
          ]}
        />
      </div>
    </>
  );
};
export default memo(BreakdownComponent);
