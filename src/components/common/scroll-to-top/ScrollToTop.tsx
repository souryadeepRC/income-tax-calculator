import { useEffect, useState } from "react";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import { IconButton } from "@mui/material";
import classes from "./ScrollToTop.module.scss";

const ScrollToTop: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    scrolling && (
      <IconButton className={classes.scroll_btn} onClick={scrollToTop}>
        <PanToolAltIcon />
      </IconButton>
    )
  );
};

export default ScrollToTop;
