import { useSelector } from "react-redux";
// library
import { motion } from "motion/react";
// store
import { selectIsMobile } from "src/store/screen/screen-selectors";
// utils
import { formatNumber } from "src/utils/tax-calculation";
// types
import { TaxChoice } from "src/types/tax-types";
// styles
import classes from "./TaxRegimeBreakup.module.scss";

interface TaxBreakupHeaderProps {
  choice: TaxChoice;
}
const TaxBreakupHeader: React.FC<TaxBreakupHeaderProps> = ({ choice }) => {
  const { difference, type } = choice;
  const isMobile: boolean = useSelector(selectIsMobile);
  const scaleValue = isMobile ? 1.2 : 1.5;

  return (
    <div className={classes.tax_breakup__header}>
      <motion.span
        className={classes.message_glow}
        animate={{
          scale: [1, scaleValue, 1],
          opacity: [0.2, 0, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      ></motion.span>
      <div className={classes.tax__message} data-testid="tax-breakup-message">
        Save Rs.<strong>{formatNumber(difference)}</strong>&nbsp;with the&nbsp;
        <strong>{type} Tax Regime</strong>.
      </div>
    </div>
  );
};

export default TaxBreakupHeader;
