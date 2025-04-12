// library
import { useDispatch, useSelector } from "react-redux";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";
import DeleteIcon from "@mui/icons-material/Delete";
import { TrivaOptionMenu } from "triva-ui";
// store
import {
  deleteDeduction,
  editDeduction,
} from "src/store/deduction/deduction-reducer";
import { selectIsMobile } from "src/store/screen/screen-selectors";
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
  const isMobile: boolean = useSelector(selectIsMobile);
  const { amountLabel, title, description } = content;
  return (
    <div className="card__container">
      <div className="card">
        <div className="card__content">
          <h2>{amountLabel}</h2>
          <p>{title}</p>
        </div>
        <TrivaOptionMenu
          {...(!isMobile ? { position: "bottom-right" } : {})}
          MenuIcon={<SettingsIcon />}
          actions={[
            {
              id: "modify",
              label: "Modify",
              icon: <TuneIcon />,
              onClick: () => dispatch(editDeduction({ type, entryId })),
            },
            {
              id: "delete",
              label: "Delete",
              icon: <DeleteIcon />,
              onClick: () => dispatch(deleteDeduction({ type, entryId })),
            },
          ]}
        />
      </div>
      {description && <p>{description}</p>}
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
