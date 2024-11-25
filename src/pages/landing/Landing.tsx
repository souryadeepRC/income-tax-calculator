import React from "react";
// library
import { Button } from "src/components/common/CommonComponents";
//icons
import AppsIcon from "@mui/icons-material/Apps";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InsightsIcon from "@mui/icons-material/Insights";
// styles
import { useSelector } from "react-redux";
import {
  selectAnnualIncome,
  selectTaxChoice,
} from "src/store/income/income-selectors";
import { formatNumber } from "src/utils/tax-calculation";
import classes from "./Landing.module.scss";
interface CardProps {
  content: JSX.Element;
  actionItem?: JSX.Element;
  className?: string;
}
const Card: React.FC<CardProps> = ({ content, className, actionItem }) => {
  return (
    <section className={`${classes.card__outer_container} ${className}`}>
      <section className={`${classes.card__inner_container} `}>
        <>
          {content}
          {actionItem}
        </>
      </section>
    </section>
  );
};
const IncomeInfo: React.FC = () => {
  const annualIncome: any = useSelector(selectAnnualIncome);
  return (
    <Card
      className={classes.income}
      actionItem={
        <Button
          variant="contained"
          startIcon={<CurrencyRupeeIcon />}
          className={classes.action__btn}
        >
          Modify amount
        </Button>
      }
      content={
        <section>
          <span className={classes.label}>Annual Income</span>
          <strong className={classes.amount}>
            Rs.{formatNumber(annualIncome)}
          </strong>
          <span className={classes.description}>Including provident fund</span>
        </section>
      }
    />
  );
};
const TaxInfo: React.FC = () => {
  const { label, taxAmount, percentage } = useSelector(selectTaxChoice);

  return (
    <Card
      className={classes.tax}
      actionItem={
        <Button
          variant="contained"
          startIcon={<InsightsIcon />}
          className={classes.action__btn}
        >
          View Breakdown
        </Button>
      }
      content={
        <section>
          <span
            title={`Yearly Tax: Rs. ${formatNumber(taxAmount.yearly)}`}
            className={classes.label}
          >
            {`Tax Rs.${formatNumber(taxAmount.monthly)}/month`}
          </span>
          <strong className={classes.amount}>
            SAVE {formatNumber(percentage)}%
          </strong>
          <span className={classes.description}>
            By opting {label} Tax Regime
          </span>
        </section>
      }
    />
  );
};
const Landing: React.FC = () => {
  return (
    <section className={classes.page__container}>
      <section className={classes.page__heading}>
        <span className={classes.title}>
          Instant Tax Calculator: Know Your Tax in Seconds!
        </span>
        <span className={classes.description}>
          Wondering how much tax you'll pay? Our instant tax calculator makes it
          simple – just enter your salary to see a clear breakdown of your
          estimated tax, deductions, and take-home pay. Perfect for planning and
          peace of mind, all in just a few clicks!
        </span>
        <Button variant="contained" startIcon={<AppsIcon />}>
          Get Started
        </Button>
      </section>
      <section className={classes.insight__container}>
        <IncomeInfo />
        <TaxInfo />
      </section>
    </section>
  );
};

export default React.memo(Landing);
