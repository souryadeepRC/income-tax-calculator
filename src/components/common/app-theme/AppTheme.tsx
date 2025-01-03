// library
import { useDispatch, useSelector } from "react-redux";
// components
import { Switch } from "src/components/common/CommonComponents";
// actions
import { toggleAppTheme } from "src/store/screen/screen-actions";
// selector
import { selectAppTheme } from "src/store/screen/screen-selectors";
// types
import { AppTheme as AppThemeType } from "src/types/screen-types";
import { AppDispatch } from "src/types/store-types";
// styles
import "./AppTheme.scss";

const AppTheme: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const appTheme: AppThemeType = useSelector(selectAppTheme);

  const onThemeChange = (): void => {
    dispatch(toggleAppTheme());
  };

  return (
    <Switch
      className="app_theme__switch"
      checked={appTheme === "dark"}
      onChange={onThemeChange}
    />
  );
};
export default AppTheme;
