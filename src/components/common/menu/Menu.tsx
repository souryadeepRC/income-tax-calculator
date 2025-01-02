import { IconButton, MenuItem, Menu as MuiMenu } from "@mui/material";
import { memo, ReactNode, useState } from "react";
// styles
import "./Menu.scss";

interface MenuAction {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}
interface MenuProps {
  MenuIcon: ReactNode;
  actions: MenuAction[];
}
const Menu: React.FC<MenuProps> = ({ MenuIcon, actions }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        data-testid="menu-icon-btn"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {MenuIcon}
      </IconButton>
      <MuiMenu
        className="menu__container"
        data-testid="menu-container"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {actions.map((action: MenuAction) => (
          <MenuItem
            key={action.label}
            data-testid={`menu-item-${action.label}`}
            onClick={() => {
              action.onClick();
              handleClose();
            }}
          >
            {action.icon} {action.label}
          </MenuItem>
        ))}
      </MuiMenu>
    </>
  );
};
export default memo(Menu);
