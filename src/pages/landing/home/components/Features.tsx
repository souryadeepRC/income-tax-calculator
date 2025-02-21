import React from "react";
import { AccountBalanceWallet, Dashboard, Savings } from "@mui/icons-material";

import classes from "./Features.module.scss";
import { CustomSvgIcon } from "src/types/common-types";

interface FeatureOptionProps {
  Icon: CustomSvgIcon;
  label: string;
  title: string;
  description: string;
}
const FeatureOption: React.FC<FeatureOptionProps> = ({
  Icon,
  label,
  title,
  description,
}) => {
  return (
    <section className={classes.feature__option}>
      <div>
        <Icon />
        &nbsp;{label}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </section>
  );
};
const Features = () => {
  return (
    <section className={classes.features__container}>
      <h2>How It Works</h2>
      <div className={classes.features}>
        <FeatureOption
          Icon={AccountBalanceWallet}
          label="Income"
          title="Enter your annual income"
          description="Quickly input your annual salary or income to get started."
        />
        <FeatureOption
          Icon={Savings}
          label="Deduction"
          title="Understand deductions & exemptions"
          description="Learn about the various tax deductions and exemptions available to
              reduce your taxable income."
        />
        <FeatureOption
          Icon={Dashboard}
          label="Tax Breakup"
          title="Choose between old and new tax regimes"
          description="Select the tax regime that suits you best for accurate
              calculation."
        />
      </div>
    </section>
  );
};

export default Features;
