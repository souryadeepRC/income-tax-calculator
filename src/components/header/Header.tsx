import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
// library
import { motion } from "motion/react";
import { NavLink } from "react-router";
import { useToggle } from "triva-ui";
import { ThemeButton } from "react-web-theme";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
// components
import { Button, Modal } from "src/components/common";
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

interface MotionHeaderProps {
  className: string;
  children: React.ReactElement;
}
const MotionHeader: React.FC<MotionHeaderProps> = ({ children, className }) => {
  return (
    <motion.header
      className={className}
      animate={{
        scale: [1, 1.02, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      {children}
    </motion.header>
  );
};

const HeaderUser: React.FC = () => {
  const isMobile: boolean = useSelector(selectIsMobile);

  return (
    <MotionHeader className={classes.header_user__container}>
      <>
        <AppTitle />
        {!isMobile && <NavigationDesktop />}
      </>
    </MotionHeader>
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
      <MotionHeader className={classes.header_landing__container}>
        <>
          <AppTitle />
          {!username && (
            <Button
              variant="text"
              onClick={handleAuth}
              startIcon={<AccountCircleIcon />}
            >
              Login
            </Button>
          )}
        </>
      </MotionHeader>
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
  const isMobile = useSelector(selectIsMobile);
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  return (
    <>
      <div className={classes.header__container}>
        {isLoggedIn ? <HeaderUser /> : <HeaderLanding />}
      </div>
      {isMobile && <NavigationMobile />}
    </>
  );
};

export default Header;
