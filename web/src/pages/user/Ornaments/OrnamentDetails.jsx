import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrnaments as fetchOrnamentById } from "../../../api/ornamentsApi.js";
import { Box, Typography, Card, CardMedia, CardContent, styled, Divider, Stack, Button, IconButton } from "@mui/material";
import Topbar from "../../../components/Topbar/Topbar.jsx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import adminLogout from "../../../utils/adminLogout.js";


const CardStyled = styled(Card)({
    maxWidth: 300,
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
    "&:hover": { boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
});



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
        navigator.share ? navigator.share({ title: ornament.name, url: shareUrl }) 
        : alert(`Copy this link: ${shareUrl}`);
    };

    if (!ornament) return <Typography>Loading...</Typography>;

    return (
        <>
            <Topbar title={ornament.name} />
            <Box sx={{ p: 3, mt: 10, display: "flex", justifyContent: "center" }}>
                <CardStyled key={ornament.id} sx={{ placeSelf: "center", minWidth: "280px", marginTop: "10px" }}>
                    <CardMedia component="img" height="220" image={ornament.image} alt={ornament.name} />
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold">
                            {ornament.name}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Button
                                startIcon={<VisibilityIcon />}
                                onClick={() => navigate(`/ornament/${ornament.id}`)}
                                size="small"
                            >
                                View Details
                            </Button>
                            <IconButton onClick={() => handleShare(ornament)} color="primary">
                                <ShareIcon />
                            </IconButton>
                        </Stack>
                    </CardContent>
                </CardStyled>
            </Box>
        </>
    );
};

export default OrnamentDetails;
