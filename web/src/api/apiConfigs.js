// src/api/apiConfig.js
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const API = {
    METAL: `${BASE_URL}/metal/latest/prices`,
};

export default API;
