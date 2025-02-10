import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ menuItems, setActivePage, activePage }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleItemClick = (key) => {
        setActivePage(key);
        setMobileOpen(false);
    };

    const drawer = (
        <List>
            {menuItems.map((item) => (
                <ListItem 
                    button 
                    key={item.key} 
                    onClick={() => handleItemClick(item.key)} 
                    sx={{
                        bgcolor: activePage === item.key ? "#eeea" : "transparent",
                        top: 64
                    }}
                >
                    <ListItemText primary={item.label} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 }, top: 64 }}>
            {/* Mobile Sidebar */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { width: 240 },
                    top: 64
                }}
            >
                {drawer}
            </Drawer>
            
            {/* Desktop Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", top: 64 }
                }}
                open
            >
                {drawer}
            </Drawer>
            
            {/* Menu Button for Mobile */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ position: "absolute", top: 64, left: 16, display: { sm: "none" } }}
            >
                <MenuIcon />
            </IconButton>
        </Box>
    );
};

export default Sidebar;
