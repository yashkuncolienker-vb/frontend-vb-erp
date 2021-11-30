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

const boxStyles = {
  position: "fixed",
  top: "70px",
  left: "0",
  height: "100vh",
  backgroundColor: "white",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
};

const listStyles = {
  width: "250px",
  height: "100%",
  maxWidth: "250px",
  bgcolor: "white",
  color: "black",
};

const paperStyles = {
  padding: 0,
  margin: 0,
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
  const [openTasks, setOpenTasks] = useState(false);
  const [openPMO, setOpenPMO] = useState(false);
  const [openCMS, setOpenCMS] = useState(false);
  const [openRR, setOpenRR] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };
  const handleClickTasks = (event) => {
    setOpenTasks(!openTasks);
  };
  const handleClickPMO = (event) => {
    setOpenPMO(!openPMO);
  };
  const handleClickCMS = (event) => {
    setOpenCMS(!openCMS);
  };
  const handleClickRR = (event) => {
    setOpenRR(!openRR);
  };
  const sideMenu = [
    {
      name: "My Profile",
    },
    {
      name: "Tasks",
      dropDown: ["Create Profile", "Reviews"],
      open: openTasks,
      handle: handleClickTasks,
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
      open: openPMO,
      handle: handleClickPMO,
    },
    {
      name: "CIMS",
    },
    {
      name: "CMS",
      dropDown: ["PO/SOW", "Invoicing"],
      open: openCMS,
      handle: handleClickCMS,
    },
    {
      name: "R&R",
      dropDown: ["Catalog", "Reward"],
      open: openRR,
      handle: handleClickRR,
    },
  ];
  return (
    <Box sx={boxStyles}>
      <Paper sx={paperStyles} elevation={0}>
        <List sx={listStyles} component="nav">
          <Grid paddingY="20px" container justifyContent="center">
            <Avatar style={{ width: "80px", height: "80px" }} />
          </Grid>
          {sideMenu.map((menuItem, i) => {
            if (!menuItem.dropDown) {
              return (
                <CustomListItemButton
                  selected={selectedIndex === i}
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
                <>
                  <CustomListItemButton
                    onClick={() => {
                      menuItem.handle();
                      handleListItemClick(i);
                    }}
                    selected={selectedIndex === i}
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
                        <CustomListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <GridViewIcon style={{ color: "black" }} />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </CustomListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              );
            }
          })}
        </List>
      </Paper>
    </Box>
  );
};
export default SidebarNavigation;
