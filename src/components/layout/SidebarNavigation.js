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
import { styled } from "@mui/material/styles";
const customStyles = {
  position: "fixed",
  top: "70px",
  left: "0",
  height: "100vh",
  width: "250px",
};

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#ff4500",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#ff4500",
  },
}));

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
      <List
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: 250,
          bgcolor: "black",
          color: "white",
          "&": {
            overflow: "scroll",
          },
          "&::-webkit-scrollbar": {
            width: "5px",
          },
        }}
        component="nav"
      >
        {sideMenu.map((menuItem, i) => {
          if (!menuItem.dropDown) {
            return (
              <CustomListItemButton
                selected={selectedIndex === i}
                onClick={() => handleListItemClick(i)}
              >
                <ListItemIcon>
                  <DonutLargeIcon color="primary" />
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
                  id={i}
                  selected={selectedIndex === i}
                >
                  <ListItemIcon>
                    <DonutLargeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={menuItem.name} />
                  {menuItem.open ? <ExpandLess /> : <ExpandMore />}
                </CustomListItemButton>
                <Collapse in={menuItem.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menuItem.dropDown.map((item) => (
                      <CustomListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <GridViewIcon color="primary" />
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
    </Box>
  );
};

export default SidebarNavigation;
