// ============================================================
// reports.js
// Backend routes for Report Generation
// Reads directly from the SQL views created in database/views.sql
// Database: agriculture_db
// ============================================================

const express = require('express');
const router = express.Router();
const db = require('../db');


// ------------------------------------------------------------
// Report 1: Farmer Profit Summary
// Uses the SQL view v_farmer_profit_summary
// ------------------------------------------------------------
router.get('/api/reports/farmer-profit-summary', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                farmer_id,
                farmer_name,
                total_records,
                total_revenue,
                total_cost,
                total_net_profit
            FROM v_farmer_profit_summary
            ORDER BY total_net_profit DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching farmer profit summary:', error);
        res.status(500).json({
            error: 'Failed to fetch farmer profit summary'
        });
    }
});


// ------------------------------------------------------------
// Report 2: Equipment Rental Details
// Uses the SQL view v_equipment_rental_details
// ------------------------------------------------------------
router.get('/api/reports/equipment-rental-details', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                rental_id,
                farmer_name,
                equipment_name,
                equipment_type,
                rental_date,
                return_date,
                rental_days,
                rental_cost,
                status
            FROM v_equipment_rental_details
            ORDER BY rental_date DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching equipment rental details:', error);
        res.status(500).json({
            error: 'Failed to fetch equipment rental details'
        });
    }
});


// ------------------------------------------------------------
// Report 3: Market Sales Summary
// Uses the SQL view v_market_sales_summary
// ------------------------------------------------------------
router.get('/api/reports/market-sales-summary', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                market_id,
                market_name,
                location,
                total_sales,
                total_quantity_sold,
                total_revenue
            FROM v_market_sales_summary
            ORDER BY total_revenue DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching market sales summary:', error);
        res.status(500).json({
            error: 'Failed to fetch market sales summary'
        });
    }
});


module.exports = router;