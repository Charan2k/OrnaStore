import { axiosInstance, API } from "./apiConfigs";

const fetchMetalPrices = async () => {
    try {
        const response = await axiosInstance.get(API.METAL);
        return response.data; 
    } catch (error) {
        console.error("Error fetching metal prices:", error);
        throw error; 
    }
};

const fetchHistoricalMetalPrices = async () => {
    try {
        const response = await axiosInstance.get(API.METAL_HISTORICAL);
        return response.data;
    } catch (error) {
        console.error("Error fetching historical metal prices:", error);
        throw error;
    }
};

export { fetchMetalPrices, fetchHistoricalMetalPrices };
