const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all equipment rental records
router.get('/api/equipment-rentals', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                er.rental_id,
                er.farmer_id,
                CONCAT(f.first_name, ' ', f.last_name) AS farmer_name,
                er.equipment_id,
                e.equipment_name,
                er.rental_date,
                er.return_date,
                er.rental_days,
                er.rental_cost,
                er.status,
                er.notes
            FROM equipment_rental er
            JOIN farmers f ON er.farmer_id = f.farmer_id
            JOIN equipment e ON er.equipment_id = e.equipment_id
            ORDER BY er.rental_id DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching equipment rentals:', error);
        res.status(500).json({
            error: 'Failed to fetch equipment rentals'
        });
    }
});

// Get one equipment rental record
router.get('/api/equipment-rentals/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM equipment_rental WHERE rental_id = ?`,
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Equipment rental not found'
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching equipment rental:', error);
        res.status(500).json({
            error: 'Failed to fetch equipment rental'
        });
    }
});

// Create equipment rental
router.post('/api/equipment-rentals', async (req, res) => {
    try {
        const {
            farmer_id,
            equipment_id,
            rental_date,
            return_date,
            rental_days,
            rental_cost,
            status,
            notes
        } = req.body;

        if (
            !farmer_id ||
            !equipment_id ||
            !rental_date ||
            !rental_days ||
            rental_cost === undefined ||
            rental_cost === null
        ) {
            return res.status(400).json({
                error: 'Farmer, equipment, rental date, rental days and rental cost are required'
            });
        }

        if (Number(rental_days) <= 0) {
            return res.status(400).json({
                error: 'Rental days must be greater than 0'
            });
        }

        if (Number(rental_cost) < 0) {
            return res.status(400).json({
                error: 'Rental cost cannot be negative'
            });
        }

        const [result] = await pool.query(
            `INSERT INTO equipment_rental
            (
                farmer_id,
                equipment_id,
                rental_date,
                return_date,
                rental_days,
                rental_cost,
                status,
                notes
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                farmer_id,
                equipment_id,
                rental_date,
                return_date || null,
                rental_days,
                rental_cost,
                status || 'Requested',
                notes || null
            ]
        );

        res.status(201).json({
            message: 'Equipment rental created successfully',
            rental_id: result.insertId
        });
    } catch (error) {
        console.error('Error creating equipment rental:', error);

        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
                error: 'Selected farmer or equipment does not exist'
            });
        }

        res.status(500).json({
            error: 'Failed to create equipment rental'
        });
    }
});

// Update equipment rental
router.put('/api/equipment-rentals/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const {
            farmer_id,
            equipment_id,
            rental_date,
            return_date,
            rental_days,
            rental_cost,
            status,
            notes
        } = req.body;

        if (
            !farmer_id ||
            !equipment_id ||
            !rental_date ||
            !rental_days ||
            rental_cost === undefined ||
            rental_cost === null
        ) {
            return res.status(400).json({
                error: 'Farmer, equipment, rental date, rental days and rental cost are required'
            });
        }

        if (Number(rental_days) <= 0) {
            return res.status(400).json({
                error: 'Rental days must be greater than 0'
            });
        }

        if (Number(rental_cost) < 0) {
            return res.status(400).json({
                error: 'Rental cost cannot be negative'
            });
        }

        const [result] = await pool.query(
            `UPDATE equipment_rental
             SET farmer_id = ?,
                 equipment_id = ?,
                 rental_date = ?,
                 return_date = ?,
                 rental_days = ?,
                 rental_cost = ?,
                 status = ?,
                 notes = ?
             WHERE rental_id = ?`,
            [
                farmer_id,
                equipment_id,
                rental_date,
                return_date || null,
                rental_days,
                rental_cost,
                status || 'Requested',
                notes || null,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Equipment rental not found'
            });
        }

        res.json({
            message: 'Equipment rental updated successfully'
        });
    } catch (error) {
        console.error('Error updating equipment rental:', error);

        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
                error: 'Selected farmer or equipment does not exist'
            });
        }

        res.status(500).json({
            error: 'Failed to update equipment rental'
        });
    }
});

// Delete equipment rental
router.delete('/api/equipment-rentals/:id', async (req, res) => {
    try {
        const [result] = await pool.query(
            `DELETE FROM equipment_rental WHERE rental_id = ?`,
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Equipment rental not found'
            });
        }

        res.json({
            message: 'Equipment rental deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting equipment rental:', error);
        res.status(500).json({
            error: 'Failed to delete equipment rental'
        });
    }
});

module.exports = router;