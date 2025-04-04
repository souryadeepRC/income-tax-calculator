// library
import { NavLink } from "react-router";
//components
import LogOutButton from "src/components/log-out/LogoutButton";
// constants
import { NAVIGATION_LIST, NavigationType } from "./Navigation";
// styles
import "./Navigation.scss";

const NavigationMobile: React.FC = () => {
  return (
    <div className="navigation_mobile__container">
      <ul>
        {NAVIGATION_LIST.map(({ label, Icon, path }: NavigationType) => (
          <li key={label}>
            <NavLink to={path} data-testid={label}>
              <Icon fontSize="small" />
            </NavLink>
          </li>
        ))}
        <li>
          <LogOutButton />
        </li>
      </ul>
    </div>
  );
};

export default NavigationMobile;
