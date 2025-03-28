import axios from "axios";
import API from "./apiConfigs.js";

const adminLoginApi = async (email, password) => {
    try {
        const response = await axios.post(API.ADMIN_LOGIN, {
            email,
            password,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const addOrnament = async (formData, token) => {
    try {
        const response = await axios.post(API.ADD_ORNAMENT, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteOrnament = async (token, id) => {
    try {
        const response = await axios.delete(API.DELETE_ORNAMENT.replace(":id", id), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const updateOrnament = async (token, id, formData) => {
    try {
        const response = await axios.put(API.UPDATE_ORNAMENT.replace(":id", id), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const fetchAdmins = async (token) => {
    try {
        const response = await axios.get(API.FETCH_ADMINS, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const registerOrUpdateAdmin = async (token, data) => {
    try {
        const response = await axios.post(API.REGISTER_OR_UPDATE_ADMIN, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteAdmin = async (token, id) => {
    try {
        const response = await axios.delete(API.DELETE_ADMIN.replace(":id", id), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export { adminLoginApi, addOrnament, fetchAdmins, registerOrUpdateAdmin, deleteAdmin, updateOrnament, deleteOrnament };
