import { memo, useState } from "react";
// library
import { Box, Tab, Tabs } from "@mui/material";
// styles
import classes from "./IncomeDetails.module.scss";

const IncomeBreakdown: React.FC = () => {
  const components = Array(50).fill("T");
  return (
    <section className={classes.income_breakdown_container}>
      {components.map((income: number, index: number) => {
        return (
          <div key={index} className={classes.item_container}>
            <Box className={classes.item_inner__container}>
              <Box
                display="flex"
                flexDirection="column"
                padding={"0 1vw"}
                width={"80%"}
              >
                <strong>Basic</strong>
                <span>Rs. 50000</span>
              </Box>
            </Box>
          </div>
        );
      })}
    </section>
  );
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
const IncomeDetails: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box width={"60%"}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={`Salary Income Rs. 30000`} />
          <Tab label={`Extra Income Rs. 20000`} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <IncomeBreakdown />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Extra Income
      </CustomTabPanel>
    </Box>
  );
};
export default memo(IncomeDetails);
