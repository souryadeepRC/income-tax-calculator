import { memo } from "react";
// library
import { Box } from "@mui/material";
// icons
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// components
import { BreadcrumbLink } from "src/components/common/CommonComponents";
// styles
import classes from "./RouteLayout.module.scss";

interface RouteLayoutProps {
  parentPath: string;
  label: string;
  children: React.ReactNode;
}
const RouteLayout: React.FC<RouteLayoutProps> = ({
  parentPath,
  label,
  children,
}) => (
  <section className={classes.route_layout__container}>
    <div>
      <BreadcrumbLink
        parentPath={parentPath}
        homeIcon={<AccountBalanceWalletIcon fontSize="small" />}
      />
      <div
        className={classes.route_layout__label}
        data-testid="route-layout-label"
      >
        {label}
      </div>
    </div>
    {children}
  </section>
);
export default memo(RouteLayout);
