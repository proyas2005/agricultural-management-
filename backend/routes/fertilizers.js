const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all fertilizers
router.get('/api/fertilizers', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                fertilizer_id,
                fertilizer_name,
                fertilizer_type,
                unit,
                price_per_unit,
                description
            FROM fertilizers
            ORDER BY fertilizer_id DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching fertilizers:', error);
        res.status(500).json({
            error: 'Failed to fetch fertilizers'
        });
    }
});

// Get one fertilizer
router.get('/api/fertilizers/:id', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                fertilizer_id,
                fertilizer_name,
                fertilizer_type,
                unit,
                price_per_unit,
                description
            FROM fertilizers
            WHERE fertilizer_id = ?
        `, [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Fertilizer not found'
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching fertilizer:', error);
        res.status(500).json({
            error: 'Failed to fetch fertilizer'
        });
    }
});

// Create fertilizer
router.post('/api/fertilizers', async (req, res) => {
    try {
        const {
            fertilizer_name,
            fertilizer_type,
            unit,
            price_per_unit,
            description = ''
        } = req.body;

        const [result] = await db.query(`
            INSERT INTO fertilizers (
                fertilizer_name,
                fertilizer_type,
                unit,
                price_per_unit,
                description
            )
            VALUES (?, ?, ?, ?, ?)
        `, [
            fertilizer_name,
            fertilizer_type,
            unit,
            price_per_unit,
            description
        ]);

        res.status(201).json({
            message: 'Fertilizer created successfully',
            fertilizer_id: result.insertId
        });
    } catch (error) {
        console.error('Error creating fertilizer:', error);
        res.status(500).json({
            error: 'Failed to create fertilizer'
        });
    }
});

// Update fertilizer
router.put('/api/fertilizers/:id', async (req, res) => {
    try {
        const {
            fertilizer_name,
            fertilizer_type,
            unit,
            price_per_unit,
            description = ''
        } = req.body;

        const [result] = await db.query(`
            UPDATE fertilizers
            SET
                fertilizer_name = ?,
                fertilizer_type = ?,
                unit = ?,
                price_per_unit = ?,
                description = ?
            WHERE fertilizer_id = ?
        `, [
            fertilizer_name,
            fertilizer_type,
            unit,
            price_per_unit,
            description,
            req.params.id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Fertilizer not found'
            });
        }

        res.json({
            message: 'Fertilizer updated successfully'
        });
    } catch (error) {
        console.error('Error updating fertilizer:', error);
        res.status(500).json({
            error: 'Failed to update fertilizer'
        });
    }
});

// Delete fertilizer
router.delete('/api/fertilizers/:id', async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM fertilizers WHERE fertilizer_id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Fertilizer not found'
            });
        }

        res.json({
            message: 'Fertilizer deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting fertilizer:', error);
        res.status(500).json({
            error: 'Failed to delete fertilizer'
        });
    }
});

module.exports = router;