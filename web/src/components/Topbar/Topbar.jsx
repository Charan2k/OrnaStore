import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBarColor } from "../../constants/colors.js";

const Topbar = ({ title, onLogout, bgColor, menuButtons = [], logo }) => {
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            sx={{
                width: "100%",
                boxShadow: 2,
                zIndex: theme.zIndex.drawer + 1,
                backgroundColor: bgColor ?? AppBarColor,
                px: 2,
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {logo && <Box>{logo}</Box>}
                    {title && (
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                letterSpacing: "0.8px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {title}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                    {menuButtons.map((btn, index) => (
                        <Button
                            key={index}
                            color="inherit"
                            onClick={btn.onClick}
                            startIcon={btn.icon || null}
                            sx={{
                                fontWeight: 500,
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
                    {onLogout && (
                        <IconButton
                            color="inherit"
                            onClick={onLogout}
                            aria-label="Logout"
                            sx={{ ml: 1 }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
