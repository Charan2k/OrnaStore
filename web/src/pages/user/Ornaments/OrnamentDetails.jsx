import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrnaments as fetchOrnamentById } from "../../../api/ornamentsApi.js";
import { Box, Typography, Card, CardMedia, CardContent, styled, Divider, Stack, IconButton, Chip } from "@mui/material";
import Topbar from "../../../components/Topbar/Topbar.jsx";
import ShareIcon from "@mui/icons-material/Share";
import Footer from "../../Footer.js";
import adminLogout from "../../../utils/adminLogout.js";

const CardStyled = styled(Card)(({ theme }) => ({
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
    },
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
}));

const OrnamentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ornament, setOrnament] = useState(null);

    useEffect(() => {
        const loadOrnament = async () => {
            try {
                const response = await fetchOrnamentById(1, 1, null, id);
                const processedOrnaments = response.data.ornaments.map((ornament) => {
                    if (ornament.image && ornament.image.data) {
                        const base64String = btoa(String.fromCharCode(...new Uint8Array(ornament.image.data)));
                        return { ...ornament, image: `data:image/jpeg;base64,${base64String}` };
                    }
                    return ornament;
                });
                if (processedOrnaments && processedOrnaments.length > 0) {
                    setOrnament(processedOrnaments[0]);
                }
            } catch (error) {
                adminLogout(error);
                console.error("Error fetching ornament details:", error);
            }
        };
        loadOrnament();
    }, [id]);

    const handleShare = (ornament) => {
        const shareUrl = `${window.location.origin}/ornament/${ornament.id}`;
        navigator.share
            ? navigator.share({ title: ornament.name, url: shareUrl })
            : alert(`Copy this link: ${shareUrl}`);
    };

    if (!ornament) return <Typography>Loading...</Typography>;

    return (
        <>
            <Topbar title="Ornament Boutique" menuButtons={[{
                label: "Home",
                onClick: () => navigate("/"),
            },{
                label: "Ornaments",
                onClick: () => navigate("/#/ornaments"),
            }]} />

            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" padding="20px">
                <CardStyled>
                    <CardMedia
                        component="img"
                        height="220"
                        image={ornament.image}
                        alt={ornament.name}
                        sx={{ borderRadius: "8px 8px 0 0" }}
                    />
                    <CardContent sx={{ textAlign: "left", padding: "15px" }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            {ornament.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                            }}
                        >
                            {ornament.description}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                            {/* Category (Gender-based) */}
                            <Chip
                                label={`${
                                    ornament.category?.toLowerCase() === "men"
                                        ? "👨‍💼"
                                        : ornament.category?.toLowerCase() === "women"
                                        ? "👩‍💼"
                                        : "🧑"
                                } ${ornament.category}`}
                                color={
                                    ornament.category?.toLowerCase() === "men"
                                        ? "warning"
                                        : ornament.category?.toLowerCase() === "women"
                                        ? "warning"
                                        : "warning"
                                }
                                variant="outlined"
                                size="small"
                                sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
                            />

                            {/* Metal Type */}
                            <Chip
                                label={`${
                                    ornament.metalType?.toLowerCase() === "gold"
                                        ? "🟡"
                                        : ornament.metalType?.toLowerCase() === "silver"
                                        ? "⚪"
                                        : "🔗"
                                } ${ornament.metalType}`}
                                color={
                                    ornament.metalType?.toLowerCase() === "gold"
                                        ? "warning"
                                        : ornament.metalType?.toLowerCase() === "silver"
                                        ? "warning"
                                        : "warning"
                                }
                                variant="outlined"
                                size="small"
                                sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
                            />

                            {/* Ornament Type */}
                            <Chip
                                label={`${
                                    ornament.ornamentType?.toLowerCase() === "ring"
                                        ? "💍"
                                        : ornament.ornamentType?.toLowerCase() === "bracelet"
                                        ? "📿"
                                        : "🎗"
                                } ${ornament.ornamentType}`}
                                color={
                                    ornament.ornamentType?.toLowerCase() === "ring"
                                        ? "warning"
                                        : ornament.ornamentType?.toLowerCase() === "bracelet"
                                        ? "warning"
                                        : "warning"
                                }
                                variant="outlined"
                                size="small"
                                sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
                            />
                        </Stack>
                        <Divider sx={{ my: 1 }} />
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <IconButton onClick={() => handleShare(ornament)} color="warning">
                                <ShareIcon />
                            </IconButton>
                        </Stack>
                    </CardContent>
                </CardStyled>
            </Box>

            <Footer />
        </>
    );
};

export default OrnamentDetails;
