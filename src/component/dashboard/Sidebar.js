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
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <List>{children}</List>
    </Drawer>
  );
}

export function SidebarItem({ icon, text, selected, badge, onClick }) {
  return (
    <ListItemButton selected={selected} onClick={onClick}>
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
