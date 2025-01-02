import React from "react";
// library
import { Button } from "src/components/common/CommonComponents";
//icons
import AppsIcon from "@mui/icons-material/Apps";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InsightsIcon from "@mui/icons-material/Insights";
// styles
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectTaxChoice } from "src/store/tax/tax-selectors";
import { formatNumber } from "src/utils/tax-calculation";
import classes from "./Landing.module.scss";
import { selectOverallIncomeAmount } from "src/store/income/income-selectors";
interface CardProps {
  content: JSX.Element;
  actionItem?: JSX.Element;
  className?: string;
}
const Card: React.FC<CardProps> = ({ content, className, actionItem }) => (
  <section className={`${classes.card__inner_container} ${className}`}>
    {content}
    {actionItem}
  </section>
);
const IncomeInfo: React.FC = () => {
  const overallAmount = useSelector(selectOverallIncomeAmount);
  const navigate = useNavigate();
  const onModifyIncome = () => {
    navigate("/income");
  };
  return (
    <Card
      className={classes.income}
      actionItem={
        <Button
          variant="contained"
          startIcon={<CurrencyRupeeIcon />}
          className={classes.action__btn}
          onClick={onModifyIncome}
          data-testid="modify-amount-btn"
        >
          Modify amount
        </Button>
      }
      content={
        <section>
          <span className={classes.label}>Annual Income</span>
          <strong className={classes.amount}>
            Rs.{formatNumber(overallAmount)}
          </strong>
          <span className={classes.description}>Including provident fund</span>
        </section>
      }
    />
  );
};
const TaxInfo: React.FC = () => {
  const navigate = useNavigate();
  const onViewBreakdown = () => {
    navigate("/tax-breakup");
  };
  const { type, taxAmount, difference } = useSelector(selectTaxChoice);

  return (
    <Card
      className={classes.tax}
      actionItem={
        <Button
          variant="contained"
          startIcon={<InsightsIcon />}
          className={classes.action__btn}
          onClick={onViewBreakdown}
          data-testid="view-breakdown-btn"
        >
          View Breakdown
        </Button>
      }
      content={
        <section>
          {taxAmount.yearly === 0 ? (
            <div>You don&#39;t have to pay income tax</div>
          ) : (
            <>
              <span
                title={`Yearly Tax: Rs. ${formatNumber(taxAmount.yearly)}`}
                className={classes.label}
              >
                {`Tax Rs.${formatNumber(taxAmount.monthly)}/month`}
              </span>
              <strong className={classes.amount}>
                SAVE Rs.{formatNumber(difference)}
              </strong>
            </>
          )}
          <span className={classes.description}>
            By opting {type} Tax Regime
          </span>
        </section>
      }
    />
  );
};
const Landing: React.FC = () => {
  const navigate = useNavigate();
  const onGetStarted = () => {
    navigate("/income");
  };
  return (
    <section className={classes.page__container}>
      <section className={classes.page__heading}>
        <span className={classes.title}>
          Instant Tax Calculator: Know Your Tax in Seconds!
        </span>
        <span className={classes.description}>
          Wondering how much tax you&#39;ll pay? Our instant tax calculator
          makes it simple – just enter your salary to see a clear breakdown of
          your estimated tax, deductions, and take-home pay. Perfect for
          planning and peace of mind, all in just a few clicks!
        </span>
        <Button
          variant="contained"
          startIcon={<AppsIcon />}
          onClick={onGetStarted}
          data-testid="get-started-btn"
        >
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
