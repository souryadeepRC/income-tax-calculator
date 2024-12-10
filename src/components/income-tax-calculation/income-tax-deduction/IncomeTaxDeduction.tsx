import { NavLink, Route, Routes } from "react-router";
// library
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button } from "@mui/material";
// components
import { Deduction80C } from "./80C/Deduction80C";
import { DeductionChapter6 } from "./DeductionChapter6";
import { Rent } from "./rent/Rent";
import { Section24 } from "./section24/Section24";
// styles
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { selectDeductionBreakup } from "src/store/deduction/deduction-selectors";
import "./IncomeTaxDeduction.scss";
import "./deduction-element.scss";

export const DeductionElement = ({ children, className = "", onSave }: any) => {
  return (
    <section className="deduction__option">
      <section className={`deduction__option-content ${className}`}>
        {children}
      </section>
      <Button className="deduction__option__button" onClick={onSave}>
        Save
      </Button>
    </section>
  );
};
export const IncomeTaxDeduction = () => {
  const deductionBreakup = useSelector(selectDeductionBreakup);

  return (
    <section className="deduction__container">
      <ul className="deduction-list">
        <li>
          <NavLink to="rent">
          <div className="deduction-list-item">
              <Box display="flex" flexDirection="column">
                <strong>Rent</strong>
                <span>Rs. {deductionBreakup.rentDeduction}</span>
              </Box>
              <ArrowForwardIosIcon />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="section24">
          <div className="deduction-list-item">
              <Box display="flex" flexDirection="column">
                <strong>Section 24</strong>
                <span>Rs. {deductionBreakup.rentDeduction}</span>
              </Box>
              <ArrowForwardIosIcon />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="80C">
          <div className="deduction-list-item">
              <Box display="flex" flexDirection="column">
                <strong>80C</strong>
                <span>Rs. {deductionBreakup.rentDeduction}</span>
              </Box>
              <ArrowForwardIosIcon />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="Chapter-VIA">
            <div className="deduction-list-item">
              <Box display="flex" flexDirection="column">
                <strong>Chapter-VIA</strong>
                <span>Rs. {deductionBreakup.rentDeduction}</span>
              </Box>
              <ArrowForwardIosIcon />
            </div>
          </NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="" />
        <Route path="rent" element={<Rent />} />
        <Route path="section24" element={<Section24 />} />
        <Route path="80C" element={<Deduction80C />} />
        <Route path="Chapter-VIA" element={<DeductionChapter6 />} />
      </Routes>
    </section>
  );
};
