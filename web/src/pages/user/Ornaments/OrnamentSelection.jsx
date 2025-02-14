import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const OrnamentSelection = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: "center", mt: 10 }}>
            <Typography variant="h4" gutterBottom>Select Your Ornament Store</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
                <Button variant="contained" onClick={() => navigate("/ornaments/male")}>
                    Male Ornaments
                </Button>
                <Button variant="contained" onClick={() => navigate("/ornaments/female")}>
                    Female Ornaments
                </Button>
            </Box>
        </Box>
    );
};

export default OrnamentSelection;
