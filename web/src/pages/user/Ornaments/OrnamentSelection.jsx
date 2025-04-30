import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
    MenuItem,
    FormControl,
    Select,
    Grid,
    Container,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Topbar from "../../../components/Topbar/Topbar";
import highQualityImage1 from "../../../assets/gold.webp";
import Footer from "../../Footer";
import highQualityImage2 from "../../../assets/silver.webp";
import AppLogo from "../../../assets/logo.jpg";
import { AppBarColor } from "../../../constants/colors";

const OrnamentSelection = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [gender, setGender] = useState("");
    const [ornamentType, setOrnamentType] = useState("");
    const [metalType, setMetalType] = useState("");

    const handleNavigate = () => {
        if (gender && ornamentType && metalType) {
            navigate(`/ornaments/${gender}/${metalType}/${ornamentType}`);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                margin: 0,
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                maxWidth: "100%",
            }}
        >
            {/* Topbar */}
            <Topbar title="OrnaWorld" bgColor={AppBarColor} 
                logo={<img src={AppLogo} alt="Logo" style={{ width: 30, height: 30, borderRadius: '10%' }} />}
                menuButtons={[{
                label: "Home",
                onClick: () => navigate("/"),
            }]} />

            {/* Hero Section */}
            <Box>
                <Carousel animation="slide" indicators={false} navButtonsAlwaysVisible>
                    {[highQualityImage1, highQualityImage2].map((image, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: isSmallScreen ? "35vh" : "50vh",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={image}
                                alt="Ornament"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Box>
                    ))}
                </Carousel>
            </Box>

            <Container maxWidth="md" sx={{ textAlign: "center", py: isSmallScreen ? 3 : 5, my: 7 }}>
                {/* Selection Panel */}
                <Grid container spacing={3} justifyContent="center">
                    {[
                        { label: "Select Gender", value: gender, options: ["male", "female"], setter: setGender },
                        {
                            label: "Select Ornament Type",
                            value: ornamentType,
                            options: ["chain", "bracelet", "ring"],
                            setter: setOrnamentType,
                        },
                        {
                            label: "Select Metal Type",
                            value: metalType,
                            options: ["gold", "silver"],
                            setter: setMetalType,
                        },
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <FormControl fullWidth>
                                <Select
                                    value={item.value}
                                    displayEmpty
                                    color="warning"
                                    onChange={(e) => item.setter(e.target.value)}
                                    sx={{
                                        bgcolor: "#fff",
                                        boxShadow: "none",
                                        border: "1px solid #ccc",
                                        "& .MuiSelect-select": { padding: "10px 16px" },
                                    }}
                                >
                                    <MenuItem color="warning" value="" disabled>
                                        {item.label}
                                    </MenuItem>
                                    {item.options.map((option) => (
                                        <MenuItem color="warning" key={option} value={option.toLowerCase()}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    ))}
                </Grid>

                {/* "Find Your Perfect Ornament" Section */}
                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} fontWeight="bold" sx={{ mb: 1, color: "#444" }}>
                        Find Your Perfect Ornament
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            maxWidth: "600px",
                            mx: "auto",
                            mb: 3,
                            fontSize: isSmallScreen ? "1rem" : "1.1rem",
                            color: "#666",
                        }}
                    >
                        Choose from a collection of timeless pieces crafted with precision and elegance.
                    </Typography>
                </Box>

                {/* Explore Now Button */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                        variant="contained"
                        size={isSmallScreen ? "small" : "large"}
                        sx={{
                            background: "linear-gradient(45deg, {AppBarColor}, #FF7F50)",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: isSmallScreen ? "1rem" : "1.1rem",
                            padding: isSmallScreen ? "8px 18px" : "10px 23px",
                            boxShadow: "0 6px 15px rgba(242, 110, 1, 0.4)",
                            borderRadius: "30px",
                            textTransform: "none",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                background: "linear-gradient(45deg, #d95b00, #ff6347)",
                                transform: "scale(1.07)",
                                boxShadow: "0 8px 20px rgba(242, 110, 1, 0.6)",
                            },
                            "&:disabled": {
                                background: "#ccc",
                                color: "#888",
                                cursor: "not-allowed",
                                boxShadow: "none",
                            },
                        }}
                        disabled={!gender || !ornamentType || !metalType}
                        onClick={handleNavigate}
                    >
                        🔍 Explore Now →
                    </Button>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default OrnamentSelection;
