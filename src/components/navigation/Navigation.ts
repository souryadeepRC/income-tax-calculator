// icons
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import SavingsIcon from "@mui/icons-material/Savings";
// components
import NavigationDesktop from "src/components/navigation/NavigationDesktop";
import NavigationMobile from "src/components/navigation/NavigationMobile";
// types
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface NavigationType {
  label: string;
  path: string;
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
}

const NAVIGATION_LIST: NavigationType[] = [
  {
    label: "Home",
    path: "",
    Icon: HomeIcon,
  },
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
export { NavigationDesktop, NavigationMobile, NavigationType, NAVIGATION_LIST };
