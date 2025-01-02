// styles
import { memo } from "react";
import "./Footer.scss";
const Footer = () => (
  <footer className="footer__container">
    Developed By
    <a
      className="footer__text"
      href="https://www.linkedin.com/in/souryadeep-roy-chowdhury/"
      target="_blank"
      rel="noreferrer"
    >
      Souryadeep Roy Chowdhury
    </a>
  </footer>
);

export default memo(Footer);
