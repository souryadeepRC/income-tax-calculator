import { memo } from "react";
// library
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// actions
import { toggleAppTheme } from "src/store/screen/screen-actions";
// selector
import { selectAppTheme } from "src/store/screen/screen-selectors";
// styles
import "./AppTheme.scss";

const AppTheme: React.FC = () => {
  const dispatch = useDispatch();
  const appTheme = useSelector(selectAppTheme);
  const onThemeChange = () => {
    dispatch(toggleAppTheme());
  };
  return (
    <Switch
      className="app_theme__switch"
      checked={appTheme === "light"}
      onChange={onThemeChange}
    />
  );
};
export default memo(AppTheme);
