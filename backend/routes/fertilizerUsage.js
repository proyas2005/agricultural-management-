const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all fertilizer usage records
router.get('/api/fertilizer-usage', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                fu.usage_id,
                fu.planting_id,
                fu.fertilizer_id,
                fu.usage_date,
                fu.quantity_used,
                fu.unit,
                fu.cost,
                fu.notes,
                CONCAT(f.first_name, ' ', f.last_name) AS farmer_name,
                c.crop_name,
                l.land_name,
                fert.fertilizer_name
            FROM fertilizer_usage fu
            JOIN planting_records pr
                ON fu.planting_id = pr.planting_id
            JOIN land l
                ON pr.land_id = l.land_id
            JOIN farmers f
                ON l.farmer_id = f.farmer_id
            JOIN crops c
                ON pr.crop_id = c.crop_id
            JOIN fertilizers fert
                ON fu.fertilizer_id = fert.fertilizer_id
            ORDER BY fu.usage_id DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching fertilizer usage:', error);
        res.status(500).json({
            error: 'Failed to fetch fertilizer usage records'
        });
    }
});

// Get one fertilizer usage record
router.get('/api/fertilizer-usage/:id', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                fu.usage_id,
                fu.planting_id,
                fu.fertilizer_id,
                fu.usage_date,
                fu.quantity_used,
                fu.unit,
                fu.cost,
                fu.notes
            FROM fertilizer_usage fu
            WHERE fu.usage_id = ?
        `, [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Fertilizer usage record not found'
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching fertilizer usage record:', error);
        res.status(500).json({
            error: 'Failed to fetch fertilizer usage record'
        });
    }
});

// Create fertilizer usage record
router.post('/api/fertilizer-usage', async (req, res) => {
    try {
        const {
            planting_id,
            fertilizer_id,
            usage_date,
            quantity_used,
            unit,
            cost,
            notes = ''
        } = req.body;

        const [result] = await db.query(`
            INSERT INTO fertilizer_usage (
                planting_id,
                fertilizer_id,
                usage_date,
                quantity_used,
                unit,
                cost,
                notes
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            planting_id,
            fertilizer_id,
            usage_date,
            quantity_used,
            unit,
            cost,
            notes
        ]);

        res.status(201).json({
            message: 'Fertilizer usage record created successfully',
            usage_id: result.insertId
        });
    } catch (error) {
        console.error('Error creating fertilizer usage:', error);
        res.status(500).json({
            error: 'Failed to create fertilizer usage record'
        });
    }
});

// Update fertilizer usage record
router.put('/api/fertilizer-usage/:id', async (req, res) => {
    try {
        const {
            planting_id,
            fertilizer_id,
            usage_date,
            quantity_used,
            unit,
            cost,
            notes = ''
        } = req.body;

        const [result] = await db.query(`
            UPDATE fertilizer_usage
            SET
                planting_id = ?,
                fertilizer_id = ?,
                usage_date = ?,
                quantity_used = ?,
                unit = ?,
                cost = ?,
                notes = ?
            WHERE usage_id = ?
        `, [
            planting_id,
            fertilizer_id,
            usage_date,
            quantity_used,
            unit,
            cost,
            notes,
            req.params.id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Fertilizer usage record not found'
            });
        }

        res.json({
            message: 'Fertilizer usage record updated successfully'
        });
    } catch (error) {
        console.error('Error updating fertilizer usage:', error);
        res.status(500).json({
            error: 'Failed to update fertilizer usage record'
        });
    }
});

// Delete fertilizer usage record
router.delete('/api/fertilizer-usage/:id', async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM fertilizer_usage WHERE usage_id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Fertilizer usage record not found'
            });
        }

        res.json({
            message: 'Fertilizer usage record deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting fertilizer usage:', error);
        res.status(500).json({
            error: 'Failed to delete fertilizer usage record'
        });
    }
});

module.exports = router;