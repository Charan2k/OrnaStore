import { axiosInstance, API } from "./apiConfigs";

export const fetchOrnaments = (page, limit, category = "", id = "", ornamentType = "", metalType = "") => {
    try {
        const url = API.FETCH_ORNAMENTS.replace(":page", page).replace(":limit", limit);

        const params = {};
        if (category) params.category = category;
        if (id) params.id = id;
        if (ornamentType) params.ornamentType = ornamentType;
        if (metalType) params.metalType = metalType;

        return axiosInstance.get(url, { params });
    } catch (error) {
        throw error;
    }
};
