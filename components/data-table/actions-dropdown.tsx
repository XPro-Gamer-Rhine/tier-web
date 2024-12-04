import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ReactNode, useState, MouseEvent } from "react";

interface Action {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
}

interface ActionsDropdownProps {
  actions?: Action[];
  buttonLabel?: string;
  onClick?: () => void;
}

export const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  actions = [],
  buttonLabel = "Actions",
  onClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (onClick) {
      onClick();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        {buttonLabel}
      </Button>
      {actions.length ? (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                borderRadius: 8,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                marginTop: "8px",
              },
            },
          }}
        >
          {actions.map((action, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                if (action.onClick) action.onClick();
                handleClose();
              }}
              style={{ padding: "12px 24px" }}
            >
              <ListItemIcon>{action.icon}</ListItemIcon>
              <Typography variant="inherit">{action.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </div>
  );
};

export default ActionsDropdown;
