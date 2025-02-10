import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

const SpinnerComp = () => {
    const isLoading = useSelector((state) => state.Spinner);

    if (!isLoading) return null;

    return (
        <Backdrop
            open={true}
            sx={{ 
                color: "#fff", 
                zIndex: 200000000, 
                backgroundColor: "rgba(0, 0, 0, 0.5)" 
            }}
        >
            <Box>
                <CircularProgress color="inherit" />
            </Box>
        </Backdrop>
    );
};

export default SpinnerComp;
