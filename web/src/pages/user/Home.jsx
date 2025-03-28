import React from "react";
import { useNavigate } from "react-router-dom";
import { GiGoldBar, GiSilverBullet } from "react-icons/gi";
import { Button, Card, CardContent, Typography, Skeleton } from "@mui/material";
import Topbar from "../../components/Topbar/Topbar.jsx";
import Footer from "../Footer.js";
import useMetalPrices from "./useMetalPrices.js";

const Home = () => {
    const navigate = useNavigate();
    const { prices, loading, error } = useMetalPrices();

    return (
        <>
            <Topbar
                title="Ornament Boutique"
                menuButtons={[
                    { label: "Home", onClick: () => navigate("/") },
                    { label: "Ornaments", onClick: () => navigate("/ornaments") },
                ]}
            />

            <div
                style={{
                    textAlign: "center",
                    maxWidth: "1000px",
                    margin: "80px auto",
                    padding: "30px",
                }}
            >
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    Live Metal Prices
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>
                    Stay updated with real-time Gold & Silver rates
                </Typography>

                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                        <Skeleton variant="rectangular" width={300} height={200} />
                        <Skeleton variant="rectangular" width={300} height={200} />
                    </div>
                ) : error ? (
                    <Typography color="error" align="center" mt={5}>
                        {error}
                    </Typography>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "20px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {/* Gold Card */}
                        <Card
                            sx={{
                                background: "rgba(255, 223, 0, 0.2)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 223, 0, 0.4)",
                                color: "#000",
                                borderRadius: "16px",
                                textAlign: "center",
                                padding: "20px",
                                boxShadow: "0 10px 20px rgba(255, 223, 0, 0.3)",
                                transition: "transform 0.3s ease-in-out",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardContent>
                                <GiGoldBar size={70} color="#FFD700" />
                                <Typography variant="h5" fontWeight="bold" mt={2}>
                                    Gold
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    ₹{prices.gold_price} / gram
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Updated: {new Date(prices.updated_at).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* Silver Card */}
                        <Card
                            sx={{
                                background: "rgba(192, 192, 192, 0.2)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(192, 192, 192, 0.4)",
                                color: "#000",
                                borderRadius: "16px",
                                textAlign: "center",
                                padding: "20px",
                                boxShadow: "0 10px 20px rgba(192, 192, 192, 0.3)",
                                transition: "transform 0.3s ease-in-out",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardContent>
                                <GiSilverBullet size={70} color="#C0C0C0" />
                                <Typography variant="h5" fontWeight="bold" mt={2}>
                                    Silver
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    ₹{prices.silver_price} / gram
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Updated: {new Date(prices.updated_at).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                )}

                <Button
                    variant="contained"
                    color="warning"
                    sx={{
                        mt: 5,
                        fontSize: "18px",
                        fontWeight: "bold",
                        padding: "14px 30px",
                        borderRadius: "12px",
                        textTransform: "none",
                        transition: "all 0.3s ease-in-out",
                        boxShadow: "0 5px 15px rgba(255, 165, 0, 0.4)",
                        "&:hover": { transform: "scale(1.1)" },
                    }}
                    onClick={() => navigate("/ornaments")}
                >
                    Explore Ornaments →
                </Button>
            </div>

            <Footer />
        </>
    );
};

export default Home;
