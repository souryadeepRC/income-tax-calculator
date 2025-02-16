import { useState } from "react";
// library
import { NavLink } from "react-router";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WidgetsIcon from "@mui/icons-material/Widgets";
// constants
import { NAVIGATION_LIST, NavigationType } from "./Navigation";
// styles
import "./Navigation.scss";

const NavigationMobile: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSlider = (): void => {
    setIsOpen((isOpen: boolean) => !isOpen);
  };
  return (
    <main className="navigation_mobile__container">
      <IconButton size="small" onClick={handleSlider}>
        <WidgetsIcon
          data-testid="navigation-menu-btn"
          className="navigation_mobile__icon"
          fontSize="small"
        />
      </IconButton>
      {isOpen && (
        <section className="navigation__slider">
          <header>
            <span>TAX CALCULATOR</span>
            <IconButton onClick={handleSlider} size="small">
              <CloseIcon
                data-testid="navigation-menu-close-btn"
                fontSize="small"
              />
            </IconButton>
          </header>
          <ul>
            {NAVIGATION_LIST.map(({ label, Icon, path }: NavigationType) => (
              <li key={label}>
                <NavLink to={path} onClick={handleSlider}>
                  <div>
                    <Icon fontSize="small" />
                    <span>{label}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default NavigationMobile;
