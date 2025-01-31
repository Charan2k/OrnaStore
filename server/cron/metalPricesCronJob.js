const { updateMetalPrices } = require("../controllers/metalPriceController.js");
const { logger } = require("../utils/logger.js");
const cron = require("node-cron");


const metalPricesCronJob = async () => {
    const metalPriceJobInterval = process.env.METAL_PRICE_CRON_SCHEDULE || "0 0 * * *"; // Default to midnight
    cron.schedule(metalPriceJobInterval, async () => {
        try {
            logger("Running cron job to update metal prices...");
            await updateMetalPrices();
            logger("Metal prices updated.");
        } catch (error) {
            logger("Error during metal price update:", error);
        }
    });

    // Also run the cron job immediately when the server starts
    await updateMetalPrices();
};

module.exports = {
    metalPricesCronJob,
};
