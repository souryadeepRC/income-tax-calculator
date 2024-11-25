import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// icons
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SavingsIcon from "@mui/icons-material/Savings";
// selectors
import { selectIsMobile } from "src/store/screen/screen-selectors";
// styles
import "./Navigation.scss";

export const Navigation = () => {
  // store
  const isMobile: boolean = useSelector(selectIsMobile);

  // render fns
  return (
    <ul className="navigation-list">
      <li>
        <NavLink to="income">
          {isMobile ? <AccountBalanceWalletIcon /> : "Income"}
        </NavLink>
      </li>
      <li>
        <NavLink to="deduction">
          {isMobile ? <SavingsIcon /> : "Deduction"}
        </NavLink>
      </li>
      <li>
        <NavLink to="tax-breakup">
          {isMobile ? <DashboardIcon /> : "Tax Breakup"}
        </NavLink>
      </li>
    </ul>
  );
};
