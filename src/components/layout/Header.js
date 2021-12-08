import AccountCircle from "@mui/icons-material/AccountCircle";
import vbLogo from "../../assets/images/vb_logo.svg";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import { createTheme, ThemeProvider } from "@mui/material";
import axios from "../../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { userActions } from "../../store/user-slice";
const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "inset  0 -10px 3px -10px grey",
        },
      },
    },
  },
});

const customStyles = {
  image: {
    width: "180px",
  },
  toolbar: {
    display: "flex",
    height: "70px",
    justifyContent: "space-between",
    padding: "0 40px",
  },
  appbar: {
    backgroundColor: "white",
    position: "fixed",
    width: "100%",
  },
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickLogout = async () => {
    setAnchorEl(null);
    await sleep(1000);
    try {
      await axios.post("/users/logout", {}, { withCredentials: true });
      dispatch(userActions.handleLoginBool({ loginBool: false }));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Logged Out Successfully",
        })
      );
      navigate("/login");
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
        })
      );
    }
  };
  const handleClickLogin = async () => {
    setAnchorEl(null);
    try {
      navigate("/login");
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
        })
      );
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={customStyles.appbar} position="static">
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
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 0,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "center", vertical: "top" }}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          >
            {/* {Cookies.get("Token") && (
              <div>
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
              </div>
            )} */}

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            {Cookies.get("Token") ? (
              <MenuItem onClick={handleClickLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            ) : (
              <MenuItem onClick={handleClickLogin}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;
