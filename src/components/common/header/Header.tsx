// library
// icons
// components
import { Navigation } from "src/components/common/navigation/Navigation";
// styles
import "./Header.scss";

export const Header = () => {
  // render fns
  return (
    <header className="header__container">
      <span className="header__text">Tax Calculator</span>
      <Navigation />
      <div className="header__theme">Theme Button</div>
    </header>
  );
};
