import { memo } from "react";
// library
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// styles
import classes from "./BackButton.module.scss";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button
      className={classes.back__button}
      data-testid="back-btn"
      startIcon={<ChevronLeftIcon />}
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};
export default memo(BackButton);
