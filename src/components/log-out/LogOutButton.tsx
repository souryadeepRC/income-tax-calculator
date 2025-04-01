// library
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
// components
import { Button } from "src/components/common";
// store
import { setLogoutActive } from "src/store/auth/auth-actions";

interface LogOutButtonProps {
  onClick?: () => void;
}
const LogOutButton: React.FC<LogOutButtonProps> = ({ onClick }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    onClick?.();
    dispatch(setLogoutActive(true))
  }

  return (
    <Button
      className="navigation__logout"
      variant="text"
      border="round"
      startIcon={<LogoutIcon />}
      onClick={onLogout}
    >
      Logout
    </Button>
  );
};
export default LogOutButton;
