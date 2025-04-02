// library
import { NavLink } from "react-router";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
// hooks
import { useDeductionNavigation } from "src/hooks"; 
// utils
import { formatNumber } from "src/utils/tax-calculation";
// styles
import classes from "./DeductionPage.module.scss"; 

interface DeductionTypeProps {
  navigation: { title: string; path: string; amount: number };
}
const DeductionType: React.FC<DeductionTypeProps> = ({ navigation }) => {
  const { title, path, amount } = navigation;
  return (
    <>
      <NavLink to={path}>
        See Details <ReadMoreIcon />
      </NavLink>
      <h3>{title}</h3>
      <h2>Rs. {formatNumber(amount)}</h2>
    </>
  );
};
const DeductionNavigation = () => {
  const navigations = useDeductionNavigation();
  return (
    <ul className={classes.deduction__options}>
      {navigations.map((navigation) => (
        <li key={navigation.key}>
          <DeductionType navigation={navigation} />
        </li>
      ))}
    </ul>
  );
};

export default DeductionNavigation;
