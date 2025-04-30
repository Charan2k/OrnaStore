import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GenderSelection = () => {
    const navigate = useNavigate();

    const handleSelectGender = (gender) => {
        localStorage.setItem("selectedGender", gender);
        navigate("/#/ornaments");
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" fontWeight="bold" mb={3}>
                Select Your Store
            </Typography>
            <Box display="flex" gap={3}>
                <Button variant="contained" color="primary" onClick={() => handleSelectGender("male")}>
                    Men's Store
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleSelectGender("female")}>
                    Women's Store
                </Button>
            </Box>
        </Box>
    );
};

export default GenderSelection;
