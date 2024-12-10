import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import React, { memo } from "react";
import { Location, NavLink, useLocation } from "react-router";
import "./BreadcrumbLink.scss";
interface BreadcrumbLinkProps {
  parentPath?: string;
  homeIcon?: React.ReactNode;
}
const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
  homeIcon,
  parentPath,
}) => {
  const { pathname }: Location = useLocation();
  const pathLinks = pathname.split("/").filter(Boolean);
  if (pathLinks.length === 1) return <></>;
  return (
    <section className="breadcrumb__link__container">
      {pathLinks?.map((path: string, index: number) => {
        if (index === pathLinks.length - 1) {
          return (
            <span data-testid={path} key={path}>
              {path}
            </span>
          );
        }
        if (path === parentPath) {
          return (
            <NavLink data-testid={path} key={path} to={`/${path}`}>
              {homeIcon ? homeIcon : "Home"}
              <KeyboardDoubleArrowRightIcon fontSize="small" />
            </NavLink>
          );
        }
        return (
          <NavLink data-testid={path} key={path} to={path}>
            {path}
            <KeyboardDoubleArrowRightIcon fontSize="small" />
          </NavLink>
        );
      })}
    </section>
  );
};
export default memo(BreadcrumbLink);
