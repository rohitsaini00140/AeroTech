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

import { Sidebar, SidebarItem } from "./Sidebar"; // your sidebar components
import AdminRegisterForm from "./AdminContent"; // your admin form
import GetLeavePage from "../../pages/Get-Leave"; // leave page
import DashboardContent from "./Dashboard";
import AdminLogin from "../../pages/AdminLogin";
import HolidayList from "../../pages/Holiday";
import GetItem from "../../pages/GetItem";
import GetHolidays from "../../pages/GetHoliday";


const drawerWidth = 240;

// Custom hook to detect mobile
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
  const [selectedMenu, setSelectedMenu] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedMenu") || "dashboard";
    }
    return "dashboard";
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useIsMobile(600);

  useEffect(() => {
    localStorage.setItem("selectedMenu", selectedMenu);
  }, [selectedMenu]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    if (isMobile) setMobileOpen(false);
  };

  // Inside DashboardLayout component
function renderContent() {
  switch (selectedMenu) {
    case "dashboard":
      return <DashboardContent />;
    case "admin":
      return <AdminRegisterForm />;
    case "leave":
      return <GetLeavePage />;
    case "AdminHoliday":
      return <HolidayList />;
      case "GetAdminHoliday":
      return <GetHolidays/>;
    case "getitem":
      return <GetItem/>
    default:
      return null;
  }
}

  const drawer = (
    <Sidebar>

      
      <SidebarItem
        icon={<DashboardIcon />}
        text="Dashboard"
        selected={selectedMenu === "dashboard"}
        onClick={() => handleMenuClick("dashboard")}
      />

     
      <SidebarItem
        icon={<DashboardIcon />}
        text="Admin"
        selected={selectedMenu === "admin"}
        onClick={() => handleMenuClick("admin")}
      />
      <SidebarItem
        icon={<Business />}
        text="Leave"
        selected={selectedMenu === "leave"}
        onClick={() => handleMenuClick("leave")}
      />
      <SidebarItem
        icon={<Contacts />}
        text="GetItem"
        selected={selectedMenu === "getitem"}
        onClick={() => handleMenuClick("getitem")}
      />
       <SidebarItem
        icon={<Contacts />}
        text="AdminHoliday"
        selected={selectedMenu === "AdminHoliday"}
        onClick={() => handleMenuClick("AdminHoliday")}
      />
       <SidebarItem
        icon={<Contacts />}
        text="GetHoliday"
        selected={selectedMenu === "GetAdminHoliday"}
        onClick={() => handleMenuClick("GetAdminHoliday")}
      />
      
    </Sidebar>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh",  }}>
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
               mt: "50px" 
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
        {renderContent()}
      </Box>
    </Box>
  );
}
