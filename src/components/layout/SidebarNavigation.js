import "./SidebarNavigation.module.css";
import Box from "@mui/material/Box";
import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import GridViewIcon from "@mui/icons-material/GridView";
const customStyles = {
  position: "fixed",
  top: "70px",
  left: "0",
  height: "100vh",
  width: "250px",
};

const SidebarNavigation = () => {
  const [openTasks, setOpenTasks] = useState(false);
  const [openPMO, setOpenPMO] = useState(false);
  const [openCMS, setOpenCMS] = useState(false);
  const [openRR, setOpenRR] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

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
    <Box sx={customStyles}>
      <List component="nav">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(0)}
        >
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(1)}
        >
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </List>

      <List
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: 250,
          bgcolor: "primary",
          color: "white",
        }}
        component="nav"
      >
        {sideMenu.map((menuItem, i) => {
          if (!menuItem.dropDown) {
            return (
              <ListItemButton
                selected={selectedIndex === i}
                onClick={() => handleListItemClick(i)}
              >
                <ListItemIcon>
                  <DonutLargeIcon />
                </ListItemIcon>
                <ListItemText primary={menuItem.name} />
              </ListItemButton>
            );
          } else {
            return (
              <>
                <ListItemButton
                  onClick={menuItem.handle}
                  selected={selectedIndex === i}
                >
                  <ListItemIcon>
                    <DonutLargeIcon />
                  </ListItemIcon>
                  <ListItemText primary={menuItem.name} />
                  {menuItem.open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={menuItem.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menuItem.dropDown.map((item, j) => (
                      <ListItemButton key={j} sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <GridViewIcon />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarNavigation;
