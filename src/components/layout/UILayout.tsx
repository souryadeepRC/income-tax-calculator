import classes from "./UILayout.module.scss";
interface UILayoutProps {
  children: React.ReactElement;
}
const UILayout: React.FC<UILayoutProps> = ({ children }) => {
  return <div className={classes.layout__container}>{children}</div>;
};
export default UILayout;
