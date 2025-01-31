// src/api/metalApi.js
import axios from "axios";
import API from "./apiConfigs.js"; // Import API URL from apiConfig.js

// Fetch the latest metal prices
const fetchMetalPrices = async () => {
    try {
        const response = await axios.get(API.METAL); // Use the full API URL
        return response.data; // return the latest prices data
    } catch (error) {
        console.error("Error fetching metal prices:", error);
        throw error; // Rethrow the error to be handled in the calling component
    }
};

export { fetchMetalPrices };
