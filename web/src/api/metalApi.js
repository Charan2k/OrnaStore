import axios from "axios";
import API from "./apiConfigs.js";

const fetchMetalPrices = async () => {
    try {
        const response = await axios.get(API.METAL); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching metal prices:", error);
        throw error; 
    }
};

const fetchHistoricalMetalPrices = async () => {
    try {
        const response = await axios.get(API.METAL_HISTORICAL);
        return response.data;
    } catch (error) {
        console.error("Error fetching historical metal prices:", error);
        throw error;
    }
};

export { fetchMetalPrices, fetchHistoricalMetalPrices };
