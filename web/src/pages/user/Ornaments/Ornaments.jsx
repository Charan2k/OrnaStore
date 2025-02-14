import React, { useState, useEffect } from "react";
import { fetchOrnaments as fetchOrnamentsByCategory } from "../../../api/ornamentsApi.js";
import { useParams, useNavigate } from "react-router-dom";
import { 
    Card, CardMedia, CardContent, Typography, Button, 
    Box, Pagination, Stack, Divider, IconButton 
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import { styled } from "@mui/system";
import Topbar from "../../../components/Topbar/Topbar.jsx";

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

const Ornaments = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [ornaments, setOrnaments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const loadOrnaments = async () => {
            try {
                const response = await fetchOrnamentsByCategory(page, pageSize, category);
                const processedOrnaments = response.data.ornaments.map((ornament) => {
                    if (ornament.image && ornament.image.data) {
                        const base64String = btoa(String.fromCharCode(...new Uint8Array(ornament.image.data)));
                        return { ...ornament, image: `data:image/jpeg;base64,${base64String}` };
                    }
                    return ornament;
                });
                setOrnaments(processedOrnaments);
                setTotalPages(Math.ceil(response.data.total / pageSize));
            } catch (error) {
                console.error("Error fetching ornaments:", error);
            }
        };
        loadOrnaments();
    }, [category, page]);

    const handleShare = (ornament) => {
        const shareUrl = `${window.location.origin}/ornament/${ornament.id}`;
        navigator.share ? navigator.share({ title: ornament.name, url: shareUrl }) 
        : alert(`Copy this link: ${shareUrl}`);
    };

    return (
        <>
            <Topbar title={`${category.charAt(0).toUpperCase() + category.slice(1)} Ornaments`} />
            <Box sx={{ p: 3, mt: 10 }}>
                <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={5}>
                    {ornaments.map((ornament) => (
                        <CardStyled key={ornament.id} sx={{ placeSelf: "center", minWidth: "280px", marginTop: "10px" }}>
                            <CardMedia component="img" height="220" image={ornament.image} alt={ornament.name} />
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">{ornament.name}</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Button startIcon={<VisibilityIcon />} onClick={() => navigate(`/ornament/${ornament.id}`)} size="small">
                                        View Details
                                    </Button>
                                    <IconButton onClick={() => handleShare(ornament)} color="primary">
                                        <ShareIcon />
                                    </IconButton>
                                </Stack>
                            </CardContent>
                        </CardStyled>
                    ))}
                </Box>
                <Box mt={3} display="flex" justifyContent="center">
                    <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} color="primary" />
                </Box>
            </Box>
        </>
    );
};

export default Ornaments;
