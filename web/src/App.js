// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import "./App.css";

function App() {
    return (
        <div
            className="App"
        >
            <Router>
                <Routes>
                    {/* User Routes */}
                    {userRoutes}

                    {/* Admin Routes */}
                    {adminRoutes}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
