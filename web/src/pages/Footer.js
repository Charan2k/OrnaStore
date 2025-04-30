import React from "react";
import { Box, Typography } from "@mui/material";
import { AppBarColor } from "../constants/colors";

const Footer = () => {
    return (
        <Box
            sx={{
                background: AppBarColor,
                color: "white",
                py: 1,
                textAlign: "center",
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100vw",
                maxWidth: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack on small screens
                alignItems: "center",
                justifyContent: "space-between",
                px: { xs: 2, sm: 3 },
                fontSize: { xs: "0.8rem", sm: "1rem" }, // Adjust font size for smaller screens
                height: { xs: "auto", sm: "60px" }, // Adjust height dynamically
                zIndex: 1000,
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    fontSize: { xs: "0.8rem", sm: "1rem" }, // Responsive font size
                    textAlign: { xs: "center", sm: "left" }, // Center text on small screens
                    width: "100%", // Ensure it doesn't overflow
                    whiteSpace: "nowrap",
                }}
            >
                Ornament Boutique
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    fontSize: { xs: "0.7rem", sm: "1rem" }, // Adjust text size
                    textAlign: { xs: "center", sm: "right" },
                    width: "100%",
                    whiteSpace: "nowrap",
                }}
            >
                © 2025 All Rights Reserved
            </Typography>
        </Box>
    );
};

export default Footer;
