import { axiosInstance, API } from "./apiConfigs";

export const fetchOrnaments = async (page, limit, category = "", id = "", ornamentType = "", metalType = "") => {
    try {
        const url = API.FETCH_ORNAMENTS.replace(":page", page).replace(":limit", limit);

        const params = {};
        if (category) params.category = category;
        if (id) params.id = id;
        if (ornamentType) params.ornamentType = ornamentType;
        if (metalType) params.metalType = metalType;

        const response = await axiosInstance.get(url, { params });
        return response;
    } catch (error) {
        // If the server returns a 500 error, return an empty result instead of throwing
        if (error.response?.status === 500) {
            return {
                data: {
                    total: 0,
                    ornaments: []
                }
            };
        }
        throw error;
    }
};

export const fetchAvailableOrnamentTypes = async (metalType = "") => {
    try {
        const url = API.AVAILABLE_ORNAMENT_TYPES;
        const params = {};
        if (metalType) params.metalType = metalType;
        
        const response = await axiosInstance.get(url, { params });
        return response.data.types;
    } catch (error) {
        console.error('Error fetching available ornament types:', error);
        return [];
    }
};
