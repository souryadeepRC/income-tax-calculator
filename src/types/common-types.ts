
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type CustomSvgIcon = OverridableComponent<SvgIconTypeMap> & {
  muiName?: string;
};