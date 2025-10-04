import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";

type SelectItem = {
  label: string;
  value: string;
  link: string;
};

interface SelectProps {
  label: string;
  items: SelectItem[];
}

const DropBox: React.FC<SelectProps> = ({ label, items }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (link: string) => {
    handleClose();
    navigate(link);
  };

  return (
    <>
      <Button
        color="error"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
      >
        {label}
      </Button>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            borderRadius: 5,
            paddingLeft: 3,
            paddingRight: 3,
            gap: 5,
          },
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.value}
            onClick={() => handleSelect(item.link)}
            sx={{
              py: 1.2, 
              px: 2, 
              "&:not(:last-child)": {
                mb: 0.5, 
              },
              ":hover": {
                color: "red",
                backgroundColor: "transparent",
                borderRadius: 60,
              },
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default DropBox;
