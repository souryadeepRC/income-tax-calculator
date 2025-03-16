// styles
import { NavLink } from "react-router";
import classes from "./DeductionPage.module.scss";
import { useSelector } from "react-redux";
import { selectIsMobile } from "src/store/screen/screen-selectors";

const DeductionNavigation = () => {
  const isMobile: boolean = useSelector(selectIsMobile);
  return (
    <ul className={classes.deduction__options}>
      <li>
        <NavLink to="/deduction/rent">Rent</NavLink>
      </li>
      <li>
        <NavLink to="/deduction/section-24">
          {isMobile ? "S-24" : "Section 24"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/deduction/80C">
          {isMobile ? "80C" : "Section 80C"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/deduction/chapter-VIA">
          {isMobile ? "VI-A" : "Chapter VI-A"}
        </NavLink>
      </li>
    </ul>
  );
};

export default DeductionNavigation;
