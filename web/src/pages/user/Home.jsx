import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiGoldBar, GiSilverBullet } from "react-icons/gi";
import { Button, Card, CardContent, Typography, Skeleton, Box, Grid } from "@mui/material";
import Topbar from "../../components/Topbar/Topbar.jsx";
import Footer from "../Footer.js";
import useMetalPrices from "./useMetalPrices.js";
import PriceHistoryChart from "../../components/PriceHistoryChart";

const Home = () => {
    const navigate = useNavigate();
    const { prices, historicalData, loading, error } = useMetalPrices();
    const [showAppBanner, setShowAppBanner] = useState(true);

    return (
        <>
            <Topbar
                title="Ornament Boutique"
                menuButtons={[
                    { label: "Home", onClick: () => navigate("/") },
                    { label: "Ornaments", onClick: () => navigate("/ornaments") },
                ]}
            />

            {showAppBanner ? (
                <Box sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    textAlign: 'center'
                }}>
                    <Box sx={{ 
                        maxWidth: 500,
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        p: 4,
                        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
                    }}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                            Download Our Mobile App
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                            Get the best experience with our mobile app for iOS and Android
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
                            <Button variant="contained" size="large" sx={{ px: 4 }}>iOS</Button>
                            <Button variant="contained" size="large" sx={{ px: 4 }}>Android</Button>
                        </Box>
                        <Button 
                            variant="outlined" 
                            size="large"
                            sx={{ px: 4 }}
                            onClick={() => setShowAppBanner(false)}
                        >
                            Continue to Website
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ p: 3, mt: 10 }}>
                    <div style={{ textAlign: "center", maxWidth: "1200px", margin: "0 auto" }}>
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
                            <>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                    gap: "20px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginBottom: "40px"
                                }}>
                                    {/* Gold Card */}
                                    <Card sx={{
                                        background: "rgba(255, 223, 0, 0.2)",
                                        backdropFilter: "blur(10px)",
                                        border: "1px solid rgba(255, 223, 0, 0.4)",
                                        borderRadius: "16px",
                                        padding: "20px",
                                        boxShadow: "0 10px 20px rgba(255, 223, 0, 0.3)",
                                    }}>
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
                                    <Card sx={{
                                        background: "rgba(192, 192, 192, 0.2)",
                                        backdropFilter: "blur(10px)",
                                        border: "1px solid rgba(192, 192, 192, 0.4)",
                                        borderRadius: "16px",
                                        padding: "20px",
                                        boxShadow: "0 10px 20px rgba(192, 192, 192, 0.3)",
                                    }}>
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

                                {/* Price History Charts */}
                                <Grid container spacing={3} sx={{ mb: 5 }}>
                                    <Grid item xs={12} md={6}>
                                        <PriceHistoryChart 
                                            data={historicalData.map(item => ({
                                                date: item.date,
                                                price: item.gold_price
                                            }))}
                                            title="Gold Price History"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <PriceHistoryChart 
                                            data={historicalData.map(item => ({
                                                date: item.date,
                                                price: item.silver_price
                                            }))}
                                            title="Silver Price History"
                                        />
                                    </Grid>
                                </Grid>
                            </>
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
                                boxShadow: "0 5px 15px rgba(255, 165, 0, 0.4)",
                            }}
                            onClick={() => navigate("/ornaments")}
                        >
                            Explore Ornaments →
                        </Button>
                    </div>
                </Box>
            )}

            <Footer />
        </>
    );
};

export default Home;
