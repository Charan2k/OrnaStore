const adminLogin = (response) => {
    console.log(response)
    localStorage.setItem("adminToken", response.data.token);
    window.location.href = "/admin/dashboard";
}

export default adminLogin;