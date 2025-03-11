import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { useToggle } from "triva-ui";
import { ThemeButton } from "react-web-theme";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Button, Modal } from "src/components/common/CommonComponents";
import Auth from "src/components/auth/Auth";
import {
  NavigationMobile,
  NavigationDesktop,
} from "src/components/navigation/Navigation";
// selectors
import { selectIsMobile } from "src/store/screen/screen-selectors";
import { selectIsLoggedIn } from "src/store/auth/auth-selectors";
// styles
import classes from "./Header.module.scss";

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
  const [isAuth, handleAuth] = useToggle(false);

  return (
    <>
      {isAuth && (
        <Modal onClose={handleAuth}>
          <Auth />
        </Modal>
      )}
      <header className={classes.header_landing__container}>
        <AppTitle />
        <Button
          variant="contained"
          border="round"
          onClick={handleAuth}
          startIcon={<AccountCircleIcon />}
        >
          Login
        </Button>
      </header>
    </>
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
