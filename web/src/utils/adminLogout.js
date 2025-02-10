const adminLogout = (err) => {
    if (err.response.data.loginFailed) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
    }
};

export default adminLogout;
