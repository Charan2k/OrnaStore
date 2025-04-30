import React from "react";
import { Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import AdminPrivateRoute from "../utils/AdminPrivateRoute.jsx";
import { Provider } from "react-redux";
import Store from "../redux/Store.js";

const adminRoutes = [
    // <Route path="/admin/login" element={<AdminLogin />} key="admin-login" />,
    <Route element={<AdminPrivateRoute />} key="admin-private">
        <Route path="/admin/dashboard" element={<Provider store={Store}><Dashboard /></Provider>} />
    </Route>,
];

export default adminRoutes;
