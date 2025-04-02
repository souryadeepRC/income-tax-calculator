// library
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import DeleteIcon from "@mui/icons-material/Delete";
// store
import {
  deleteDeduction,
  editDeduction,
} from "src/store/deduction/deduction-reducer";
// types
import { DeductionType } from "src/types/deduction-types";
// styles
import "./Card.scss";

interface CardContent {
  amountLabel: string;
  title: string;
  description?: string;
}
interface CardProps {
  type: DeductionType;
  entryId: string;
  isEdit?: boolean;
  isDelete?: boolean;
  content: CardContent;
}

const Card: React.FC<CardProps> = ({
  type,
  entryId,
  isEdit = true,
  isDelete = true,
  content,
}) => {
  const dispatch = useDispatch();
  const { amountLabel, title, description } = content;
  return (
    <div className="card__container">
      <div className="card__action_bar">
        {isEdit && (
          <IconButton
            onClick={() => dispatch(editDeduction({ type, entryId }))}
          >
            <TuneIcon />
          </IconButton>
        )}
        {isDelete && (
          <IconButton
            onClick={() => dispatch(deleteDeduction({ type, entryId }))}
          >
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
