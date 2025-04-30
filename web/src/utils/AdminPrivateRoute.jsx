import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
    const token = localStorage.getItem("adminToken");

    return token ? <Outlet /> : <Navigate to="/#/admin/login" />;
};

export default AdminPrivateRoute;
