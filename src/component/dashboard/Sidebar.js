// src/component/dashboard/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";

const drawerWidth = 240;

export function Sidebar({ children }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffff",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <List>{children}</List>
    </Drawer>
  );
}

export function SidebarItem({ icon, text, badge, to }) {
  return (
    <ListItemButton
      component={NavLink}
      to={to}
      // style={({ isActive }) => ({
      //   backgroundColor: isActive ? "#e0e0e0" : "inherit",
      // })}
    >
      <ListItemIcon>
        {badge ? (
          <Badge badgeContent={badge} color="primary">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}
