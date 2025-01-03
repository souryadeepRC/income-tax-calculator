import { useSelector } from "react-redux";
// components
import { AppTheme } from "src/components/common/CommonComponents";
import {
  NavigationMobile,
  NavigationDesktop,
} from "src/components/navigation/Navigation";
// selectors
import { selectIsMobile } from "src/store/screen/screen-selectors";
// styles
import "./Header.scss";

const Header: React.FC = () => {
  const isMobile: boolean = useSelector(selectIsMobile);
  return (
    <header className="header__container">
      {isMobile && <NavigationMobile />}
      <span className="header__text">Tax Calculator</span>
      {!isMobile && <NavigationDesktop />}
      <div className="header__theme">
        <AppTheme />
      </div>
    </header>
  );
};

export default Header;
