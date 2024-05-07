import { NavLink } from "react-router-dom";
// icons
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// components
import { Navigation } from "src/components/common/navigation/Navigation";
// styles
import "./Header.scss";

export const Header = () => {
  // render fns
  return (
    <header className="header__container">
      <NavLink to="">
        <CurrencyRupeeIcon className="app-logo" />
        <span> Tax Calculator </span>
      </NavLink>
      <Navigation />
    </header>
  );
};
