// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { metalPricesCronJob } = require("./cron/metalPricesCronJob.js");
const sequelize = require("./config/database.js");

dotenv.config(); // Load environment variables from .env file

const app = express();


app.use(cors());
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const routes = require("./routes");

// Register routes
const routes = require("./routes");
app.use("/api", [...Object.values(routes)]);

// Sync the database and start the server
const startServer = async () => {
    try {
        // Sync the database
        await sequelize.sync({ alter: false, force: false }); // Sync DB with tables
        console.log("Database synced successfully!");

        // Start the cron job(s)
        if (process.env.CRON_JOB_ENABLED === "true") {
            metalPricesCronJob();
        }

        // Start the Express server
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server running on HTTP at port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1); // Exit if there's an error during setup
    }
};

startServer();
