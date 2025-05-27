import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Toolbar,
  AppBar,
  Typography,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Dashboard as DashboardIcon,
  Business,
  Contacts,
} from "@mui/icons-material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArticleIcon from '@mui/icons-material/Article';

import TaskIcon from '@mui/icons-material/Task';

import { Sidebar, SidebarItem } from "./Sidebar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile(600);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Sidebar>
      <SidebarItem
        icon={<DashboardIcon sx={{ color: "#8E0048" }} />}
        text="Dashboard"
        to="/dashboard"
      />
      <SidebarItem
        icon={<GroupAddIcon sx={{ color: "#8E0048" }} />}
        text="Admin"
        to="/dashboard/admin"
      />
      <SidebarItem
        icon={<ExitToAppIcon sx={{ color: "#8E0048" }} />}
        text="Leave"
        to="/dashboard/leave"
      />
      <SidebarItem
        icon={<Business sx={{ color: "#8E0048" }} />}
        text="GetItem"
        to="/dashboard/getitem"
      />
      <SidebarItem
        icon={<Contacts sx={{ color: "#8E0048" }} />}
        text="AdminHoliday"
        to="/dashboard/adminholiday"
      />
      <SidebarItem
        icon={<EventBusyIcon sx={{ color: "#8E0048" }} />}
        text="GetHoliday"
        to="/dashboard/getadminholiday"
      />
      <SidebarItem
        icon={<CreateNewFolderIcon sx={{ color: "#8E0048" }} />}
        text="CreateUser"
        to="/dashboard/create-user"
      />
    
      <SidebarItem
        icon={<TaskIcon sx={{ color: "#8E0048" }} />}
        text="GetUser"
        to="/dashboard/get-user"
      />

      <SidebarItem
        icon={<AddCircleOutlineIcon sx={{ color: "#8E0048" }} />}
        text="Add Paper"
        to="/dashboard/addpaper-form"
      />
      <SidebarItem
        icon={<ArticleIcon sx={{ color: "#8E0048" }} />}
        text="Get Papers"
        to="/dashboard/get-paper"
      />

    </Sidebar>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#8E0048" }}>
      <CssBaseline />
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              mt: "50px",
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      )}

      <Box
        component="main"
        flex={1}
        p={3}
        overflow="auto"
        sx={{
          mt: isMobile ? "64px" : 0,
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          boxSizing: "border-box",
        }}
      >
        <Outlet /> {/* This renders the nested route component */}
      </Box>
    </Box>
  );
}
