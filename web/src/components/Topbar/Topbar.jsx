import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Topbar = ({ title, onLogout }) => {
    return (
        <AppBar position="fixed" sx={{ width: "100%", boxShadow: 1, zIndex: 1100 }} >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                {
                    (onLogout) ?
                    <Box>
                        <Button color="inherit" onClick={onLogout}>
                            Logout
                        </Button>
                    </Box> :
                    <Box></Box>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
