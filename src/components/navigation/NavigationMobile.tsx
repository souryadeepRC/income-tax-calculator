import { useSelector } from "react-redux";
// library
import { NavLink } from "react-router";
import { useToggle } from "triva-ui";
import { IconButton } from "@mui/material";
import { Close as CloseIcon, Widgets } from "@mui/icons-material";
//components
import LogOutButton from "src/components/log-out/LogOutButton";
// store
import { selectUserName } from "src/store/auth/auth-selectors";
// constants
import { Navigation, NAVIGATION_LIST, NavigationType } from "./Navigation";
// styles
import "./Navigation.scss";

const NavigationMobile: React.FC = () => {
  const userName: string = useSelector(selectUserName);
  const [isOpen, handleSlider] = useToggle(false);
  return (
    <div className="navigation_mobile__container">
      <ul>
        {NAVIGATION_LIST.map(({ label, Icon, path }: NavigationType) => (
          <li key={label}>
            <NavLink
              to={path}
              data-testid={label}
              {...(handleSlider ? { onClick: handleSlider } : {})}
            >
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
