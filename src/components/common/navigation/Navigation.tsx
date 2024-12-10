import { memo, ReactNode } from "react";
// library
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// icons
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import SavingsIcon from "@mui/icons-material/Savings";
// selectors
import { selectIsMobile } from "src/store/screen/screen-selectors";
// styles
import "./Navigation.scss";
interface NavigationOptionProps {
  icon: ReactNode;
  label: string;
  isMobile: boolean;
}
const NavigationOption: React.FC<NavigationOptionProps> = ({
  icon,
  label,
  isMobile,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
      data-testid={label}
    >
      {icon}
      {!isMobile && <>{label}</>}
    </Box>
  );
};
const Navigation = () => {
  // store
  const isMobile: boolean = useSelector(selectIsMobile);

  // render fns
  return (
    <ul className="navigation-list">
      <li>
        <NavLink to="">
          <NavigationOption
            label="Home"
            isMobile={isMobile}
            icon={<HomeIcon fontSize="small" />}
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="income">
          <NavigationOption
            isMobile={isMobile}
            label="Income"
            icon={<AccountBalanceWalletIcon fontSize="small" />}
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="deduction">
          <NavigationOption
            isMobile={isMobile}
            label="Deduction"
            icon={<SavingsIcon fontSize="small" />}
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="tax-breakup">
          <NavigationOption
            isMobile={isMobile}
            label="Tax Breakup"
            icon={<DashboardIcon fontSize="small" />}
          />
        </NavLink>
      </li>
    </ul>
  );
};
export default memo(Navigation);
