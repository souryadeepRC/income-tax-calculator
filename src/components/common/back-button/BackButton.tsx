// library
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// components
import { Button } from "src/components/common";
// style
import "./BackButton.scss";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      className="back__Button"
      variant="text"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
    >
      Previous
    </Button>
  );
};
export default BackButton;
