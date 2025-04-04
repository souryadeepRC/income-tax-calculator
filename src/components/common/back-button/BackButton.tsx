import { useSelector } from "react-redux";
// library
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// components
import { Button } from "src/components/common";
// store
import { selectIsMobile } from "src/store/screen/screen-selectors";
// style
import "./BackButton.scss";

const BackButton: React.FC = () => {
  const isMobile: boolean = useSelector(selectIsMobile);
  const navigate = useNavigate();

  return (
    <Button
      className="back__Button"
      variant="text"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
    >
      {!isMobile ? "Previous" : ""}
    </Button>
  );
};
export default BackButton;
