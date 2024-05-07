import { NavLink, Navigate, Route, Routes } from "react-router-dom";
// library
import { Button } from "@mui/material";
// components
import { Deduction80C } from "./80C/Deduction80C";
import { DeductionChapter6 } from "./DeductionChapter6";
import { Rent } from "./rent/Rent";
import { Section24 } from "./section24/Section24";
// styles
import "react-toastify/dist/ReactToastify.css";
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
  return (
    <section className="deduction__container">
      <ul className="deduction-list">
        <li>
          <NavLink to="rent">Rent</NavLink>
        </li>
        <li>
          <NavLink to="section24">Section 24</NavLink>
        </li>
        <li>
          <NavLink to="80C">80C</NavLink>
        </li>
        <li>
          <NavLink to="Chapter-VIA">Chapter VIA</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="" element={<Navigate to="rent" />} />
        <Route path="rent" element={<Rent />} />
        <Route path="section24" element={<Section24 />} />
        <Route path="80C" element={<Deduction80C />} />
        <Route path="Chapter-VIA" element={<DeductionChapter6 />} />
      </Routes>
    </section>
  );
};
