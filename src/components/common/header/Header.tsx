import { NavLink } from "react-router-dom";
// components
import { Navigation } from "src/components/common/navigation/Navigation";
import { CurrencyRupeeIcon } from "../../../icons";
// styles
import "./Header.scss";

export const Header = () => {
  // render fns
  return (
    <header className="header__container">
      <CurrencyRupeeIcon className="app-logo" />
      <h1 className="header__text">
        <NavLink to="">Income Tax Calculator</NavLink>
      </h1>
      <Navigation />
    </header>
  );
};
