const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all profit calculations
router.get('/api/profit-calculation', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                pc.profit_id,
                pc.farmer_id,
                CONCAT(f.first_name, ' ', f.last_name) AS farmer_name,
                pc.calculation_date,
                pc.total_revenue,
                pc.fertilizer_cost,
                pc.equipment_rental_cost,
                pc.other_cost,
                pc.total_cost,
                pc.net_profit,
                pc.notes
            FROM profit_calculation pc
            JOIN farmers f ON pc.farmer_id = f.farmer_id
            ORDER BY pc.calculation_date DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching profit calculations:', error);
        res.status(500).json({
            error: 'Failed to fetch profit calculations'
        });
    }
});

// Get one profit calculation
router.get('/api/profit-calculation/:id', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                pc.profit_id,
                pc.farmer_id,
                CONCAT(f.first_name, ' ', f.last_name) AS farmer_name,
                pc.calculation_date,
                pc.total_revenue,
                pc.fertilizer_cost,
                pc.equipment_rental_cost,
                pc.other_cost,
                pc.total_cost,
                pc.net_profit,
                pc.notes
            FROM profit_calculation pc
            JOIN farmers f ON pc.farmer_id = f.farmer_id
            WHERE pc.profit_id = ?
        `, [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Profit calculation not found'
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching profit calculation:', error);
        res.status(500).json({
            error: 'Failed to fetch profit calculation'
        });
    }
});

// Create a profit calculation
router.post('/api/profit-calculation', async (req, res) => {
    try {
        const {
            farmer_id,
            calculation_date,
            total_revenue,
            fertilizer_cost = 0,
            equipment_rental_cost = 0,
            other_cost = 0,
            notes = ''
        } = req.body;

        const total_cost =
            Number(fertilizer_cost) +
            Number(equipment_rental_cost) +
            Number(other_cost);

        const net_profit =
            Number(total_revenue) - total_cost;

        const [result] = await db.query(`
            INSERT INTO profit_calculation (
                farmer_id,
                calculation_date,
                total_revenue,
                fertilizer_cost,
                equipment_rental_cost,
                other_cost,
                total_cost,
                net_profit,
                notes
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            farmer_id,
            calculation_date,
            total_revenue,
            fertilizer_cost,
            equipment_rental_cost,
            other_cost,
            total_cost,
            net_profit,
            notes
        ]);

        res.status(201).json({
            message: 'Profit calculation created successfully',
            profit_id: result.insertId,
            total_cost,
            net_profit
        });
    } catch (error) {
        console.error('Error creating profit calculation:', error);
        res.status(500).json({
            error: 'Failed to create profit calculation'
        });
    }
});

// Update a profit calculation
router.put('/api/profit-calculation/:id', async (req, res) => {
    try {
        const {
            farmer_id,
            calculation_date,
            total_revenue,
            fertilizer_cost = 0,
            equipment_rental_cost = 0,
            other_cost = 0,
            notes = ''
        } = req.body;

        const total_cost =
            Number(fertilizer_cost) +
            Number(equipment_rental_cost) +
            Number(other_cost);

        const net_profit =
            Number(total_revenue) - total_cost;

        const [result] = await db.query(`
            UPDATE profit_calculation
            SET
                farmer_id = ?,
                calculation_date = ?,
                total_revenue = ?,
                fertilizer_cost = ?,
                equipment_rental_cost = ?,
                other_cost = ?,
                total_cost = ?,
                net_profit = ?,
                notes = ?
            WHERE profit_id = ?
        `, [
            farmer_id,
            calculation_date,
            total_revenue,
            fertilizer_cost,
            equipment_rental_cost,
            other_cost,
            total_cost,
            net_profit,
            notes,
            req.params.id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Profit calculation not found'
            });
        }

        res.json({
            message: 'Profit calculation updated successfully',
            total_cost,
            net_profit
        });
    } catch (error) {
        console.error('Error updating profit calculation:', error);
        res.status(500).json({
            error: 'Failed to update profit calculation'
        });
    }
});

// Delete a profit calculation
router.delete('/api/profit-calculation/:id', async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM profit_calculation WHERE profit_id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Profit calculation not found'
            });
        }

        res.json({
            message: 'Profit calculation deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting profit calculation:', error);
        res.status(500).json({
            error: 'Failed to delete profit calculation'
        });
    }
});

module.exports = router;