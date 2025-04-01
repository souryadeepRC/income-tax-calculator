import { useSelector } from "react-redux";
// library
import { useToggle } from "triva-ui";
import { IconButton } from "@mui/material";
import { Close as CloseIcon, Widgets } from "@mui/icons-material";
//components
import LogOutButton from "src/components/log-out/LogOutButton";
// store
import { selectUserName } from "src/store/auth/auth-selectors";
// constants
import { Navigation } from "./Navigation";
// styles
import "./Navigation.scss";

const NavigationMobile: React.FC = () => {
  const userName: string = useSelector(selectUserName);
  const [isOpen, handleSlider] = useToggle(false);

  return (
    <main className="navigation_mobile__container">
      <IconButton size="small" onClick={handleSlider}>
        <Widgets
          data-testid="navigation-menu-btn"
          className="navigation_mobile__icon"
          fontSize="small"
        />
      </IconButton>
      {isOpen && (
        <section className="navigation__slider">
          <header>
            <span>Hello {userName}</span>
            <IconButton onClick={handleSlider} size="small">
              <CloseIcon
                data-testid="navigation-menu-close-btn"
                fontSize="small"
              />
            </IconButton>
          </header>
          <Navigation handleSlider={handleSlider} />
          <div className="navigation__options" >
            <LogOutButton onClick={handleSlider} />
          </div>
        </section>
      )}
    </main>
  );
};

export default NavigationMobile;
