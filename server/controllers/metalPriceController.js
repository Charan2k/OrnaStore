const axios = require("axios");
const MetalPrice = require("../models/metalPrice");
const sequelize = require("../config/database.js");
const moment = require("moment");

const API_KEY = process.env.METAL_API_KEY;
const API_URL = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=INR&currencies=XAU,XAG`;

async function updateMetalPrices() {
    try {
        const currentDate = moment().format("YYYY-MM-DD");

        // Check if prices for today already exist in the database
        const existingRecord = await MetalPrice.findOne({
            where: sequelize.where(sequelize.fn("date", sequelize.col("updated_at")), "=", currentDate),
        });

        // If a record already exists for today, skip the update and log a message
        if (existingRecord) {
            console.log("Prices for today already updated.");
            return;
        }

        // Prices are not updated yet for today, so proceed to fetch from API
        const response = await axios.get(API_URL);

        console.log("API Response:", response.data);

        if (response.data.success) {
            const { INRXAU, INRXAG } = response.data.rates; // Prices in INR for 1 ounce of gold and silver

            // Convert prices from ounce to gram
            const goldPricePerGram = INRXAU / 31.1035; // 1 ounce = 31.1035 grams
            const silverPricePerGram = INRXAG / 31.1035; // 1 ounce = 31.1035 grams

            // Insert new prices into the database
            await MetalPrice.create({
                gold_price: goldPricePerGram.toFixed(2), // Store gold price as decimal with 2 decimal places
                silver_price: silverPricePerGram.toFixed(2), // Store silver price as decimal with 2 decimal places
                updated_at: new Date(),
            });

            console.log("Metal prices updated successfully!");
        } else {
            console.error("Failed to fetch metal prices:", response.data);
        }
    } catch (error) {
        console.error("Error updating metal prices:", error);
    }
}

const getLatestMetalPrices = async (req, res) => {
    try {
        const prices = await MetalPrice.findOne({
            order: [["updated_at", "DESC"]],
            limit: 1, // Retrieve the latest price record
        });

        if (!prices) {
            return res.status(404).json({ message: "No prices found" });
        }

        res.json(prices);
    } catch (error) {
        console.error("Error fetching metal prices:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { updateMetalPrices, getLatestMetalPrices };
