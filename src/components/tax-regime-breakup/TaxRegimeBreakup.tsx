// library
import { useToggle } from "triva-ui";
import { useSelector } from "react-redux";
// components
import TaxRegimeDetails from "./TaxRegimeDetails";
import TaxSlabView from "./TaxSlabView";
import { AmountLabel, Button, Modal } from "src/components/common";
// store
import { selectIsMobile } from "src/store/screen/screen-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// types
import { TaxChoiceType, TaxScheme } from "src/types/tax-types";
// styles
import classes from "./TaxRegimeBreakup.module.scss";

interface TaxRegimeBreakupProps {
  type: TaxChoiceType;
  details: TaxScheme;
  isBestChoice?: boolean;
}

const TaxRegimeBreakup: React.FC<TaxRegimeBreakupProps> = ({
  type,
  details,
  isBestChoice,
}) => {
  const monthlyTax = details?.tax?.monthlyTax || 0;
  const [isDetailsVisible, toggleVisibility] = useToggle(false);
  const isMobile: boolean = useSelector(selectIsMobile);
  return (
    <div className={classes.regime__container}>
      {isMobile && isDetailsVisible && (
        <Modal onClose={toggleVisibility}>
          <div className={classes.tax_breakup__container}>
            <h2 className={classes.regime__title} data-testid="regime-label">
              {type} Tax Regime
            </h2>
            <TaxRegimeDetails details={details} />
          </div>
        </Modal>
      )}

      <div className={classes.regime__header}>
        {isBestChoice && (
          <div className={classes.regime__choice}>Best Choice</div>
        )}
        <h2 className={classes.regime__title} data-testid="regime-label">
          {type} Tax Regime
        </h2>
        <TaxSlabView type={type} />
      </div>
      <AmountLabel amount={`${formatNumber(monthlyTax)}/month`} />
      {isMobile ? (
        <Button
          className={classes.regime_details__btn}
          variant="text"
          onClick={toggleVisibility}
        >
          {"See details >>>"}
        </Button>
      ) : (
        <TaxRegimeDetails details={details} />
      )}
    </div>
  );
};
export default TaxRegimeBreakup;
