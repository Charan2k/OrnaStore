const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const API = {
    METAL: `${BASE_URL}/metal/latest/prices`,
    METAL_HISTORICAL: `${BASE_URL}/metal/historical/prices`,
    ADMIN_LOGIN: `${BASE_URL}/admin/signin`,
    ADD_ORNAMENT: `${BASE_URL}/admin/add-ornament-item`,
    FETCH_ADMINS: `${BASE_URL}/admin/fetch-admins`,
    DELETE_ADMIN: `${BASE_URL}/admin/delete-admin/:id`,
    REGISTER_OR_UPDATE_ADMIN: `${BASE_URL}/admin/register-or-update-admin`,
    UPDATE_ORNAMENT: `${BASE_URL}/admin/update-ornament-item/:id`,
    DELETE_ORNAMENT: `${BASE_URL}/admin/delete-ornament-item/:id`,
    FETCH_ORNAMENTS: `${BASE_URL}/fetch-ornaments?page=:page&limit=:limit`,
};

export default API;
