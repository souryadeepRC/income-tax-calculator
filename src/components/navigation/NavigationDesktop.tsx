import { memo } from "react";
// library
import { NavLink } from "react-router";
// constants
import { NAVIGATION_LIST, NavigationType } from "./Navigation";
// styles
import "./Navigation.scss";

const Navigation = () => (
  // render fns
  <ul className="navigation-list">
    {NAVIGATION_LIST.map(({ label, Icon, path }: NavigationType) => (
      <li key={label}>
        <NavLink to={path}>
          <div data-testid={label}>
            <Icon fontSize="small" />
            {label}
          </div>
        </NavLink>
      </li>
    ))}
  </ul>
);

export default memo(Navigation);
