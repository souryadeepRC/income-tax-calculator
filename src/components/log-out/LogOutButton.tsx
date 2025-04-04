// library
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
// components
import { Button } from "src/components/common";
// store
import { setLogoutActive } from "src/store/auth/auth-reducer";
import { selectIsMobile } from "src/store/screen/screen-selectors";
// styles
import classes from "./LogoutButton.module.scss";

interface LogoutButtonProps {
  onClick?: () => void;
}
const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  const isMobile = useSelector(selectIsMobile);
  const dispatch = useDispatch();

  const onLogout = () => {
    onClick?.();
    dispatch(setLogoutActive(true));
  };
  if (isMobile) {
    return (
      <IconButton className={classes.logout__btn} onClick={onLogout}>
        <LogoutIcon />
      </IconButton>
    );
  }
  return (
    <Button
      className={classes.logout__btn}
      variant="text"
      border="round"
      startIcon={<LogoutIcon />}
      onClick={onLogout}
    >
      Logout
    </Button>
  );
};
export default LogoutButton;
