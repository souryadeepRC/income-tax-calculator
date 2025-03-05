import { useDispatch, useSelector } from "react-redux";
import { TUITable } from "triva-ui";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  removeIncomeDetails,
  editIncomeEntry,
} from "src/store/income/income-actions";
import classes from "./IncomeDetails.module.scss";
import { selectIncomeOptions } from "src/store/income/income-selectors";

interface IncomeOptionsProps {}
const IncomeOptions: React.FC<IncomeOptionsProps> = () => {
  const dispatch = useDispatch();
  const incomeOptions = useSelector(selectIncomeOptions);

  const onEdit = (id: string) => {
    dispatch(editIncomeEntry(id));
  };
  const onRemove = (id: string) => {
    dispatch(removeIncomeDetails(id));
  };
  const columns = [
    {
      key: "deleteAction",
      label: "",
      render: (rowData: any) => (
        <DeleteIcon
          className={classes.income_option__delete}
          role="button"
          aria-label="income option delete icon button"
          tabIndex={0}
          onClick={() => onRemove(rowData.id)}
        />
      ),
    },
    { key: "label", label: "Category" },
    { key: "category", label: "Group" },
    {
      key: "amount",
      label: "Amount",
      render: (rowData: any) => (
        <div
          role="button"
          aria-label="income amount editable"
          tabIndex={0}
          className={classes.income__amount}
          onClick={() => onEdit(rowData.id)}
        >
          <span>{rowData.amount}</span>
          <EditIcon />
        </div>
      ),
    },
  ];

  return (
    <div className={classes.income_options__container}>
      <TUITable
        title="Income Options"
        columns={columns}
        data={incomeOptions}
        emptyRecords={"No Income option added"}
        showPagination
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
};
export default IncomeOptions;
