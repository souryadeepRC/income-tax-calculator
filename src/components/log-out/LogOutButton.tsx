// library
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
// components
import { Button } from "src/components/common";
// store
import { setLogoutActive } from "src/store/auth/auth-actions";
import { selectIsMobile } from "src/store/screen/screen-selectors";
import { IconButton } from "@mui/material";

interface LogOutButtonProps {
  onClick?: () => void;
}
const LogOutButton: React.FC<LogOutButtonProps> = ({ onClick }) => {
  const isMobile = useSelector(selectIsMobile);
  const dispatch = useDispatch();

  const onLogout = () => {
    onClick?.();
    dispatch(setLogoutActive(true));
  };
  if (isMobile) {
    return (
      <IconButton className="navigation__logout" onClick={onLogout}>
        <LogoutIcon />
      </IconButton>
    );
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
