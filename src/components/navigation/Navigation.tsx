import { NavLink } from "react-router";
// icons
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SavingsIcon from "@mui/icons-material/Savings";
// components
import LogOutButton from "src/components/log-out/LogOutButton";
import NavigationMobile from "src/components/navigation/NavigationMobile";
// types
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
// styles
import "./Navigation.scss";

type CustomSvgIcon = OverridableComponent<SvgIconTypeMap> & {
  muiName?: string;
};
interface NavigationType {
  label: string;
  path: string;
  Icon: CustomSvgIcon;
}

const NAVIGATION_LIST: NavigationType[] = [
  {
    label: "Income",
    path: "income",
    Icon: AccountBalanceWalletIcon,
  },
  {
    label: "Deduction",
    path: "deduction",
    Icon: SavingsIcon,
  },
  {
    label: "Tax Breakup",
    path: "tax-breakup",
    Icon: DashboardIcon,
  },
];
interface NavigationProps {
  className?: string;
  handleSlider?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  className,
  handleSlider,
}) => {
  return (
    <ul {...(className ? { className } : {})}>
      {NAVIGATION_LIST.map(({ label, Icon, path }: NavigationType) => (
        <li key={label}>
          <NavLink
            to={path}
            data-testid={label}
            {...(handleSlider ? { onClick: handleSlider } : {})}
          >
            <Icon fontSize="small" />
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const NavigationDesktop = () => {
  return (
    <>
      <Navigation className="navigation-list" />
      <LogOutButton />
    </>
  );
};

export { NavigationDesktop, NavigationMobile };
