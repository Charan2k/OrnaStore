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

export { fetchMetalPrices };
