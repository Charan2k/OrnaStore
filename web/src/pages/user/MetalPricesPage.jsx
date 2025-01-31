// src/pages/user/MetalPricesPage.js
import React, { useState, useEffect } from "react";
import { fetchMetalPrices } from "../../api/metalApi.js";

const MetalPricesPage = () => {
    const [prices, setPrices] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMetalPrices = async () => {
            try {
                const data = await fetchMetalPrices();
                setPrices(data);
            } catch (error) {
                setError("Error fetching metal prices.");
            } finally {
                setLoading(false);
            }
        };

        getMetalPrices();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <h2>Latest Metal Prices</h2>
            <div style={styles.card}>
                <h3>Gold Price (per gram): ₹{prices.gold_price}</h3>
                <p>Updated at: {new Date(prices.updated_at).toLocaleString()}</p>
            </div>
            <div style={styles.card}>
                <h3>Silver Price (per gram): ₹{prices.silver_price}</h3>
                <p>Updated at: {new Date(prices.updated_at).toLocaleString()}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
    },
    card: {
        margin: "15px 0",
        padding: "20px",
        background: "#f4f4f4",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
};

export default MetalPricesPage;
