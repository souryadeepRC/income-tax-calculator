import { useDispatch, useSelector } from "react-redux";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { NavLink } from "react-router";
import { ThemeButton } from "react-web-theme";
import {
  NavigationMobile,
  NavigationDesktop,
} from "src/components/navigation/Navigation";
// selectors
import { selectIsMobile } from "src/store/screen/screen-selectors";
import { selectIsLoggedIn } from "src/store/auth/auth-selectors";
// styles
import classes from "./Header.module.scss";
import { loginUser } from "src/store/auth/auth-actions";
import { Button } from "../CommonComponents";
import { IconButton } from "@mui/material";

const HeaderUser: React.FC = () => {
  const isMobile: boolean = useSelector(selectIsMobile);
  return (
    <header className={classes.header_user__container}>
      {isMobile && <NavigationMobile />}
      <AppTitle />
      {!isMobile && <NavigationDesktop />}
    </header>
  );
};
const HeaderLanding: React.FC = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(loginUser({ name: "Test", email: "test@mail.com" }));
  };
  return (
    <header className={classes.header_landing__container}>
      <AppTitle />
      <Button
        variant="contained"
        border="round"
        onClick={handleLogin}
        startIcon={<AccountCircleIcon />}
      >
        Login
      </Button>
    </header>
  );
};
const AppTitle: React.FC = () => {
  return (
    <div className={classes.header__title}>
      <NavLink to="">
        <span>TAX CALCULATOR</span>
      </NavLink>
      <ThemeButton darkIcon={<DarkModeIcon />} lightIcon={<LightModeIcon />} />
    </div>
  );
};
const Header: React.FC = () => {
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <HeaderUser /> : <HeaderLanding />;
};

export default Header;
