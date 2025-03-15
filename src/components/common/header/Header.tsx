import { lazy, Suspense } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { useToggle } from "triva-ui";
import { ThemeButton } from "react-web-theme";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Button, Modal } from "src/components/common/CommonComponents";
const Auth = lazy(() => import("src/components/auth/Auth"));
import {
  NavigationMobile,
  NavigationDesktop,
} from "src/components/navigation/Navigation";
// selectors
import { selectIsMobile } from "src/store/screen/screen-selectors";
import {
  selectIsLoggedIn,
  selectUserName,
} from "src/store/auth/auth-selectors";
// styles
import classes from "./Header.module.scss";
import authService from "src/service/Auth";
import dbService from "src/service/Database";
import { setLogoutActive } from "src/store/auth/auth-actions";

const HeaderUser: React.FC = () => {
  const dispatch = useDispatch();
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
  const username: string = useSelector(selectUserName);
  const [isAuth, handleAuth] = useToggle(false);

  return (
    <>
      {!username && isAuth && (
        <Modal onClose={handleAuth}>
          <Suspense fallback={<>Loading..</>}>
            <Auth />
          </Suspense>
        </Modal>
      )}
      <header className={classes.header_landing__container}>
        <AppTitle />
        {!username && (
          <Button
            variant="contained"
            border="round"
            onClick={handleAuth}
            startIcon={<AccountCircleIcon />}
          >
            Login
          </Button>
        )}
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
