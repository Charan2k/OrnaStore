// server.js
const express = require("express");
const app = express();
const routes = require("./routes"); // Import all routes

app.use(express.json());

app.use("/api", routes.testRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
