// src/routes/userRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/user/Home.jsx";

const userRoutes = [
    <Route path="/" element={<Home />} />,
];

export default userRoutes;
