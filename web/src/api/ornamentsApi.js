import axios from "axios";
import API from "./apiConfigs";

export const fetchOrnaments = (page, limit) => {
    try {
        const response = axios.get(API.FETCH_ORNAMENTS.replace(":page", page).replace(":limit", limit));
        return response;
    } catch (error) {
        throw error;
    }
};