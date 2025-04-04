import { useDispatch } from "react-redux";
import { TUITable } from "triva-ui";
// library
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// store
import {
  editIncomeEntry,
  deleteIncomeEntry,
} from "src/store/income/income-reducer";
// types
import { IncomeOption } from "src/types/income-types";
// utils
import { isReservedCategory } from "src/utils/income-utils";
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./IncomeDetails.module.scss";

interface IncomeOptionsProps {
  options: IncomeOption[];
}
const IncomeOptions: React.FC<IncomeOptionsProps> = ({ options }) => {
  const dispatch = useDispatch();

  const actions = [
    {
      key: "delete",
      render: (rowData: any) => {
        if (isReservedCategory(rowData.category)) return <></>;
        return (
          <DeleteIcon
            className={classes.income_option__delete}
            role="button"
            aria-label="income option delete icon button"
            tabIndex={0}
            onClick={() => dispatch(deleteIncomeEntry(rowData.id))}
          />
        );
      },
    },
  ];
  const columns = [
    { key: "category", label: "Category" },
    {
      key: "group",
      label: "Group",
    },
    {
      key: "amount",
      label: "Amount",
      render: (rowData: any) => (
        <div
          role="button"
          aria-label="income amount editable"
          tabIndex={0}
          className={classes.income__amount}
          onClick={() => dispatch(editIncomeEntry(rowData.id))}
        >
          <span>{formatNumber(rowData.amount)}</span>
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
        data={options}
        actions={actions}
        emptyRecords={"No Income option added"}
        showPagination
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};
export default IncomeOptions;
