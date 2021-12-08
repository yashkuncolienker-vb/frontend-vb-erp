import "./SidebarNavigation.module.css";
import Box from "@mui/material/Box";
import { useState } from "react";
import List from "@mui/material/List";
import { Paper } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import GridViewIcon from "@mui/icons-material/GridView";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import uiActions from "../../store/ui-slice";
import { Typography } from "@mui/material";
import { userActions } from "../../store/user-slice";
const customStyling = {
  boxStyles: {
    position: "fixed",
    top: "70px",
    backgroundColor: "white",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  },
  boxStylesRegular: {
    left: "0",
    height: "100vh",
  },
  listStyles: {
    bgcolor: "white",
    color: "black",
  },
  listStylesRegular: {
    width: "250px",
    height: "100%",
    maxWidth: "250px",
  },
  listStylesResponsive: {
    width: "100vw",
  },
  collapseStyleResponsive: {
    maxHeight: "30vh",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&:hover": {
      overflowY: "scroll",
    },
  },
  paperStyles: {
    padding: 0,
    margin: 0,
  },
  paperStylesRegular: {
    width: "250px",
    maxHeight: "90%",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&:hover": {
      overflowY: "scroll",
    },
  },
};

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#efefef",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#efefef",
  },
}));

const SidebarNavigation = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [usrData, setUsrData] = useState(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!matches) {
      dispatch(userActions.handleBool({ bool: false }));
      dispatch(userActions.handleHamburger());
    } else {
      dispatch(userActions.handleBool({ bool: true }));
      dispatch(userActions.handleHamburger());
    }
  }, [matches, dispatch]);

  useEffect(() => {
    (async () => {
      if (userState.loginBool) {
        try {
          const userData = await axios.get("users");
          setUsrData(userData);
        } catch (e) {
          dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error",
              message: "Error Populating User Data",
            })
          );
        }
      } else {
        setUsrData(null);
      }
    })();
  }, [userState.loginBool, dispatch]);

  const handleHamburger = (index) => {
    dispatch(userActions.handleHamburger());
  };
  const handleListItemClick = (index) => {
    dispatch(userActions.handleListItemClick({ index }));
  };

  const sideMenu = [
    {
      name: "My Profile",
    },
    {
      name: "Tasks",
      dropDown: ["Create Profile", "Reviews"],
      open: userState.openTasks,
      handle: () => {
        dispatch(userActions.handleClickTasks());
      },
    },
    {
      name: "Network",
    },
    {
      name: "Contract Mgmt",
    },
    {
      name: "PMO",
      dropDown: ["Projects", "Create Project", "Allocations"],
      open: userState.openPMO,
      handle: () => {
        dispatch(userActions.handleClickPMO());
      },
    },
    {
      name: "CIMS",
    },
    {
      name: "CMS",
      dropDown: ["PO/SOW", "Invoicing"],
      open: userState.openCMS,
      handle: () => {
        dispatch(userActions.handleClickCMS());
      },
    },
    {
      name: "R&R",
      dropDown: ["Catalog", "Reward"],
      open: userState.openRR,
      handle: () => {
        dispatch(userActions.handleClickRR());
      },
    },
  ];
  return (
    <Box
      sx={
        matches
          ? { ...customStyling.boxStyles }
          : { ...customStyling.boxStyles, ...customStyling.boxStylesRegular }
      }
    >
      <Paper
        sx={
          matches
            ? { ...customStyling.paperStyles }
            : {
                ...customStyling.paperStyles,
                ...customStyling.paperStylesRegular,
              }
        }
        elevation={0}
      >
        <List
          sx={
            matches
              ? {
                  ...customStyling.listStyles,
                  ...customStyling.listStylesResponsive,
                }
              : {
                  ...customStyling.listStyles,
                  ...customStyling.listStylesRegular,
                }
          }
          component="nav"
        >
          {userState.bool && (
            <CustomListItemButton onClick={handleHamburger}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="MENU" />
              {userState.openHamburger ? <ExpandLess /> : <ExpandMore />}
            </CustomListItemButton>
          )}

          <Collapse
            sx={matches ? { ...customStyling.collapseStyleResponsive } : {}}
            in={userState.openHamburger}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <Grid paddingY="20px" container justifyContent="center">
                <Avatar style={{ width: "80px", height: "80px" }} />
              </Grid>
              {userState.loginBool && usrData && (
                <Grid container direction="column" alignItems="center">
                  <Grid item xs={12}>
                    <Typography>
                      {`Hello! ${usrData.data.data.first_name} ${usrData.data.data.last_name}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mb={2}>
                    <Typography>{`${usrData.data.data.email}`}</Typography>
                  </Grid>
                </Grid>
              )}
              {sideMenu.map((menuItem, i) => {
                if (!menuItem.dropDown) {
                  return (
                    <CustomListItemButton
                      key={i}
                      selected={userState.selectedIndex === i}
                      onClick={() => handleListItemClick(i)}
                    >
                      <ListItemIcon>
                        <DonutLargeIcon style={{ color: "black" }} />
                      </ListItemIcon>
                      <ListItemText primary={menuItem.name} />
                    </CustomListItemButton>
                  );
                } else {
                  return (
                    <div key={i}>
                      <CustomListItemButton
                        onClick={() => {
                          menuItem.handle();
                          handleListItemClick(i);
                        }}
                        selected={userState.selectedIndex === i}
                      >
                        <ListItemIcon>
                          <DonutLargeIcon style={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary={menuItem.name} />
                        {menuItem.open ? <ExpandLess /> : <ExpandMore />}
                      </CustomListItemButton>
                      <Collapse in={menuItem.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {menuItem.dropDown.map((item, j) => (
                            <CustomListItemButton key={j} sx={{ pl: 4 }}>
                              <ListItemIcon>
                                <GridViewIcon style={{ color: "black" }} />
                              </ListItemIcon>
                              <ListItemText primary={item} />
                            </CustomListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </div>
                  );
                }
              })}
            </List>
          </Collapse>
        </List>
      </Paper>
    </Box>
  );
};
export default SidebarNavigation;
