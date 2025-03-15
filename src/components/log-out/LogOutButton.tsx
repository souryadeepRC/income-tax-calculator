// library
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
// components
import { Button } from "src/components/common/CommonComponents";
// store
import { setLogoutActive } from "src/store/auth/auth-actions";

const LogOutButton: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Button
      className="navigation__logout"
      variant="text"
      border="round"
      startIcon={<LogoutIcon />}
      onClick={() => dispatch(setLogoutActive(true))}
    >
      Logout
    </Button>
  );
};
export default LogOutButton;
