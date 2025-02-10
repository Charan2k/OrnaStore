const getAdminToken = () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        return token;
    }
    return null;
}

export default getAdminToken;