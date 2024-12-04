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
  label: string;
  children: React.ReactNode;
}
const RouteLayout: React.FC<RouteLayoutProps> = ({ label, children }) => {
  return (
    <section className={classes.route_layout__container}>
      <Box display="flex" alignItems="center">
        <BreadcrumbLink
          parentPath="income"
          homeIcon={<AccountBalanceWalletIcon fontSize="small" />}
        />
        <div
          className={classes.route_layout__label}
          data-testid="route-layout-label"
        >
          {label}
        </div>
      </Box>
      {children}
    </section>
  );
};
export default memo(RouteLayout);
