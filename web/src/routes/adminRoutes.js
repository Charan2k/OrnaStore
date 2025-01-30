// src/routes/adminRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard.jsx";

const adminRoutes = [
  <Route path="/admin/dashboard" element={<Dashboard />} />,
];

export default adminRoutes;
