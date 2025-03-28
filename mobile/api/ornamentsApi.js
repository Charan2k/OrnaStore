import axios from "axios";
import API from "./apiConfigs";

export const fetchOrnaments = (page, limit, category = "", id = "") => {
    try {
        const url = API.FETCH_ORNAMENTS.replace(":page", page).replace(":limit", limit);

        const params = {};
        if (category) params.category = category;
        if (id) params.id = id;

        return axios.get(url, { params });
    } catch (error) {
        throw error;
    }
};
