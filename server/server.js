// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const { metalPricesCronJob } = require("./cron/metalPricesCronJob.js");
const sequelize = require("./config/database.js");

dotenv.config(); // Load environment variables from .env file

const app = express();

// Read SSL certificates dynamically from environment variables
let sslOptions = {};
if (process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH) {
    sslOptions = {
        key: fs.readFileSync(process.env.SSL_KEY_PATH),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    };

    // Include CA bundle if it's provided
    if (process.env.SSL_CA_PATH) {
        sslOptions.ca = fs.readFileSync(process.env.SSL_CA_PATH);
    }
}

app.use(cors());
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const routes = require("./routes");

// Register routes
app.use("/api/test", routes.testRoutes);
app.use("/api", routes.metalPriceRoutes);
app.use("/api/admin/auth", routes.adminAuthRoutes);
app.use("/api/admin", routes.adminRoutes);
app.use("/api", routes.ornamentRoutes);

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
        if (Object.keys(sslOptions).length > 0) {
            const https = require("https");
            https.createServer(sslOptions, app).listen(443, () => {
                console.log(`Server running on HTTPS at port 443`);
            });
        } else {
            app.listen(PORT, () => {
                console.log(`Server running on HTTP at port ${PORT}`);
            });
        }
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1); // Exit if there's an error during setup
    }
};

startServer();
