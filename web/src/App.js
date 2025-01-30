// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* User Routes */}
                    {userRoutes}

                    {/* Admin Routes */}
                    {adminRoutes}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
