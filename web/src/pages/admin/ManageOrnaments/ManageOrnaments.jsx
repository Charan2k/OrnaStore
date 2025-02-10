import React, { useState, useEffect } from "react";
import { fetchOrnaments } from "../../../api/ornamentsApi.js";
import { deleteOrnament } from "../../../api/adminApi.js";
import { useSelector } from "react-redux";
import { 
    Card, CardMedia, CardContent, Typography, Button, 
    Box, Pagination, TextField, MenuItem, Select, 
    InputLabel, FormControl, Stack, Divider 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import getAdminToken from "../../../utils/getAdminToken.js";

const SearchContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap",
});

const CardStyled = styled(Card)({
    maxWidth: 345,
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
    "&:hover": { boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
});

const CardDetails = styled(CardContent)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
    paddingBottom: "16px",
});

const ManageOrnaments = ({ setActivePage }) => {
    const [ornaments, setOrnaments] = useState([]);
    const [filteredOrnaments, setFilteredOrnaments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [filterOrnamentType, setFilterOrnamentType] = useState("");
    const [filterMetalType, setFilterMetalType] = useState("");

    const userRole = useSelector((state) => state.CURRENT_ADMIN_ROLE);
    const userId = useSelector((state) => state.CURRENT_ADMIN_ID);

    useEffect(() => {
        const loadOrnaments = async () => {
            try {
                const response = await fetchOrnaments(page, 6);
                const processedOrnaments = response.data.ornaments.map((ornament) => {
                    if (ornament.image && ornament.image.data) {
                        const base64String = btoa(
                            String.fromCharCode(...new Uint8Array(ornament.image.data))
                        );
                        return { ...ornament, image: `data:image/jpeg;base64,${base64String}` };
                    }
                    return ornament;
                });

                setOrnaments(processedOrnaments);
                setTotalPages(response.data.totalPages);
                setFilteredOrnaments(processedOrnaments);
            } catch (error) {
                console.error("Error fetching ornaments:", error);
            }
        };
        loadOrnaments();
    }, [page]);

    const handleDelete = async (id, adminId) => {
        if (userRole === "owner" || userRole === "manager" || (userRole === "contributor" && userId === adminId)) {
            try {
                await deleteOrnament(getAdminToken(), id);
                setOrnaments(ornaments.filter((item) => item.id !== id));
                setFilteredOrnaments(filteredOrnaments.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Error deleting ornament:", error);
            }
        } else {
            alert("You do not have permission to delete this ornament.");
        }
    };

    useEffect(() => {
        let results = ornaments;

        if (search) {
            results = results.filter(ornament =>
                ornament.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filterOrnamentType) {
            results = results.filter(ornament => ornament.ornamentType === filterOrnamentType);
        }

        if (filterMetalType) {
            results = results.filter(ornament => ornament.metalType === filterMetalType);
        }

        setFilteredOrnaments(results);
    }, [search, filterOrnamentType, filterMetalType, ornaments]);

    return (
        <Box sx={{ p: 3 }}>
            {(userRole === "owner" || userRole === "manager" || userRole === "contributor") && (
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setActivePage("add-ornaments")}
                    >
                        Add New Ornament
                    </Button>
                </Box>
            )}

            <SearchContainer>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search ornaments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                    }}
                    sx={{ flexGrow: 1 }}
                />

                <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel>Ornament Type</InputLabel>
                    <Select
                        value={filterOrnamentType}
                        onChange={(e) => setFilterOrnamentType(e.target.value)}
                        label="Ornament Type"
                        size="small"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="chain">Chain</MenuItem>
                        <MenuItem value="bracelet">Bracelet</MenuItem>
                        <MenuItem value="ring">Ring</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel>Metal Type</InputLabel>
                    <Select
                        value={filterMetalType}
                        onChange={(e) => setFilterMetalType(e.target.value)}
                        label="Metal Type"
                        size="small"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="gold">Gold</MenuItem>
                        <MenuItem value="silver">Silver</MenuItem>
                    </Select>
                </FormControl>
            </SearchContainer>

            <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={3}>
                {filteredOrnaments.map((ornament) => (
                    <CardStyled key={ornament.id}>
                        <CardMedia component="img" height="220" image={ornament.image} alt={ornament.name} />
                        <CardDetails>
                            <Typography variant="h6" fontWeight="bold">{ornament.name}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {ornament.description}
                            </Typography>

                            <Stack direction="row" justifyContent="space-between" mt={1}>
                                <Typography variant="body2"><strong>Type:</strong> {ornament.ornamentType}</Typography>
                                <Typography variant="body2"><strong>Metal:</strong> {ornament.metalType}</Typography>
                            </Stack>

                            <Divider sx={{ my: 1 }} />

                            {(userRole === "owner" || userRole === "manager" || (userRole === "contributor" && userId === ornament.adminId)) && (
                                <Box display="flex" justifyContent="center" mt={1}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(ornament.id, ornament.adminId)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            )}
                        </CardDetails>
                    </CardStyled>
                ))}
            </Box>

            <Box mt={3} display="flex" justifyContent="center">
                <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} color="primary" />
            </Box>
        </Box>
    );
};

export default ManageOrnaments;
