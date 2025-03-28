import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { AppBarColor } from "../../constants/colors.js";

const Topbar = ({ title, onLogout, bgColor, menuButtons = [] }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: "100%",
                boxShadow: 2,
                zIndex: 1100,
                backgroundColor: bgColor ?? AppBarColor,
                paddingX: 2,
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Title */}
                <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: "0.8px" }}>
                    {title}
                </Typography>

                {/* Menu Buttons */}
                <Box sx={{ display: "flex", gap: 1 }}>
                    {menuButtons.map((btn, index) => (
                        <Button
                            key={index}
                            color="inherit"
                            onClick={btn.onClick}
                            startIcon={btn.icon || null} // Supports optional icons
                            sx={{
                                fontWeight: "500",
                                textTransform: "none",
                                letterSpacing: "0.5px",
                                transition: "0.3s",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                },
                            }}
                        >
                            {btn.label}
                        </Button>
                    ))}
                </Box>

                {/* Logout Button */}
                {onLogout && (
                    <IconButton color="inherit" onClick={onLogout} sx={{ ml: 2 }}>
                        Logout
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
