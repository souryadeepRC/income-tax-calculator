// library
// icons
// components
import { AppTheme, Navigation } from "src/components/common/CommonComponents";
// styles
import "./Header.scss";

export const Header = () => {
  // render fns
  return (
    <header className="header__container">
      <span className="header__text">Tax Calculator</span>
      <Navigation />
      <div className="header__theme">
        <AppTheme />
      </div>
    </header>
  );
};
