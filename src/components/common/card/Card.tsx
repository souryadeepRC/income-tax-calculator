// library
import { IconButton } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import DeleteIcon from "@mui/icons-material/Delete";
// styles
import "./Card.scss";

interface CardContent {
  amountLabel: string;
  title: string;
  description?: string;
}
interface CardProps {
  editAction?: () => void;
  deleteAction?: () => void;
  content: CardContent;
}

const Card: React.FC<CardProps> = ({ editAction, deleteAction, content }) => {
  const { amountLabel, title, description } = content;
  return (
    <div className="card__container">
      <div className="card__action_bar">
        {editAction && (
          <IconButton onClick={editAction}>
            <TuneIcon />
          </IconButton>
        )}
        {deleteAction && (
          <IconButton onClick={deleteAction}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>
      <div className="card__content">
        <h2>{amountLabel}</h2>
        <p>{title}</p>
        {description && <span>{description}</span>}
      </div>
    </div>
  );
};

interface CardWrapperProps {
  children: React.ReactElement[] | React.ReactElement;
}
const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  return (
    <div className="card__wrapper">
      <>{children}</>
    </div>
  );
};
export { Card, CardWrapper };
