import { Box } from "@mui/system";
import AccountCircle from "@mui/icons-material/AccountCircle";
import vbLogo from "../../assets/images/vb_logo.svg";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const customStyles = {
  root: {
    height: "70px",
    position: "fixed",
    width: "100%",
  },
  image: {
    width: "180px",
  },
  toolbar: {
    display: "flex",
    height: "70px",
    justifyContent: "space-between",
    margin: "0 30px",
  },
  appbar: {
    backgroundColor: "white",
  },
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={customStyles.root}>
      <AppBar sx={customStyles.appbar} position="static" elevation={4}>
        <Toolbar sx={customStyles.toolbar}>
          <img style={customStyles.image} src={vbLogo} alt="vb-logo" />
          <IconButton size="large" edge="end" onClick={handleClick}>
            <AccountCircle fontSize="large" />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
