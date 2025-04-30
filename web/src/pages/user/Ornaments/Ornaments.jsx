import React, { useState, useEffect, useMemo } from "react";
import { fetchOrnaments as fetchOrnamentsByCategory } from "../../../api/ornamentsApi.js";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Pagination,
    Stack,
    Divider,
    IconButton,
    TextField,
    InputAdornment,
    Chip,
    Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import { styled } from "@mui/system";
import Topbar from "../../../components/Topbar/Topbar.jsx";
import Footer from "../../Footer.js";

const CardStyled = styled(Card)(({ theme }) => ({
    flexGrow: 1,
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
}));

const StyledSearch = styled(TextField)({
    backgroundColor: "#fff",
    borderRadius: "25px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    "& input": {
        padding: "10px 15px",
    },
});

const Ornaments = () => {
    const { category, ornamentType, metalType } = useParams();
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [ornaments, setOrnaments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const loadOrnaments = async () => {
            try {
                const response = await fetchOrnamentsByCategory(page, pageSize, category, "", ornamentType, metalType);
                const processedOrnaments = response.data.ornaments.map((ornament) => {
                    if (ornament.image?.data) {
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
    }, [category, ornamentType, metalType, page]);

    // Search filter (now checks name, category, metalType, and description)
    const filteredOrnaments = useMemo(() => {
        return ornaments.filter((ornament) =>
            ["name", "category", "metalType", "description"].some((key) =>
                ornament[key]?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, ornaments]);

    const handleShare = (ornament) => {
        const shareUrl = `${window.location.origin}/ornament/${ornament.id}`;
        if (navigator.share) {
            navigator.share({ title: ornament.name, url: shareUrl });
        } else {
            navigator.clipboard.writeText(shareUrl);
            setSnackbarOpen(true);
        }
    };

    return (
        <>
          <Topbar title="Ornament Boutique" menuButtons={[{
                label: "Home",
                onClick: () => navigate("/"),
            },{
                label: "Ornaments",
                onClick: () => navigate("/#/ornaments"),
            }]} />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                message="Link copied!"
            />
            <Box sx={{ p: 3, mt: 10, textAlign: "center" }}>
                <TextField
                    variant="outlined"
                    placeholder="Search for ornaments..."
                    fullWidth
                    sx={{
                        maxWidth: "500px",
                        mb: 3,
                        borderRadius: "25px",

                        backgroundColor: "#fff",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "25px",
                            "& fieldset": { borderColor: "#ff9800" },
                            "&:hover fieldset": { borderColor: "#ff9800" },
                            "&.Mui-focused fieldset": {
                                borderColor: "#ff9800",
                                boxShadow: "0 0 5px rgba(255, 152, 0, 0.5)",
                            },
                        },
                    }}
                    value={searchQuery}
                    color="warning"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
                    gap={5}
                    sx={{ justifyContent: "center", padding: "20px", mb: 10 }}
                >
                    {filteredOrnaments.map((ornament) => (
                        <CardStyled
                            key={ornament.id}
                            sx={{ placeSelf: "center", minWidth: "280px", marginTop: "10px" }}
                        >
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
                                    <Button
                                        color="warning"
                                        variant="contained"
                                        startIcon={<VisibilityIcon />}
                                        onClick={() => navigate(`/#/ornament/${ornament.id}`)}
                                        size="small"
                                    >
                                        View
                                    </Button>
                                    <IconButton onClick={() => handleShare(ornament)} color="warning">
                                        <ShareIcon />
                                    </IconButton>
                                </Stack>
                            </CardContent>
                        </CardStyled>
                    ))}
                </Box>
                {totalPages > 1 && (
                    <Box mt={3} display="flex" justifyContent="center">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            color="standard"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    borderRadius: "8px",
                                    fontSize: "1rem",
                                    transition: "0.3s",
                                    "&:hover": { backgroundColor: "rgba(255, 152, 0, 0.2)" },
                                    "&.Mui-selected": { backgroundColor: "#ff9800", color: "#fff" },
                                },
                            }}
                        />
                    </Box>
                )}
                <Footer />
            </Box>
        </>
    );
};

export default Ornaments;
