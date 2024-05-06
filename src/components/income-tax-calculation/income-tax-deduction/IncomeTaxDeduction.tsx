// styles
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Deduction80C } from "./80C/Deduction80C";
import { DeductionChapter6 } from "./DeductionChapter6";
import "./IncomeTaxDeduction.scss";
import { Rent } from "./rent/Rent";
import { Section24 } from "./section24/Section24";

export const IncomeTaxDeduction = () => {
  return (
    <section className="deduction__container">
      <header>Deductions</header> 
      <ToastContainer />
      <ul className="deduction-list">
        <li>
          <NavLink to="/deduction/rent">Rent</NavLink>
        </li>
        <li>
          <NavLink to="/deduction/section24">Section 24</NavLink>
        </li>
        <li>
          <NavLink to="/deduction/80C">80C</NavLink>
        </li>
        <li>
          <NavLink to="/deduction/Chapter-VIA">Chapter VIA</NavLink></li>
      </ul>
      <Routes>
        <Route path="deduction">
          <Route path="rent" element={<Rent />} />
          <Route path="section24" element={<Section24 />} />
          <Route path="80C" element={<Deduction80C />} />
          <Route path="Chapter-VIA" element={<DeductionChapter6 />} />
        </Route>
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    </section>
  );
};
