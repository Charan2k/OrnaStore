import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/user/Home.jsx";
import Ornaments from "../pages/user/Ornaments/Ornaments.jsx";
import Store from "../redux/Store.js";
import { Provider } from "react-redux";
import OrnamentSelection from "../pages/user/Ornaments/OrnamentSelection.jsx";
import OrnamentDetails from "../pages/user/Ornaments/OrnamentDetails.jsx";

const userRoutes = [
    <Route path="/" element={<Home />} />,
    <Route path="/ornaments" element={<OrnamentSelection />} />,
    <Route path="/ornaments/:category/:metalType/:ornamentType" element={<Ornaments />} />,
    <Route path="/ornament/:id" element={<OrnamentDetails />} />,
    // <Route path="/ornaments" element={<Provider store={Store}><Ornaments /></Provider>} />,
];

export default userRoutes;
