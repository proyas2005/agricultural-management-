const pool = require('../db');

const router = require('express').Router();

// Get all planting records
router.get('/api/planting-records', async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const [records] = await connection.query(`
      SELECT pr.*, l.land_name, c.crop_name
      FROM planting_records pr
      JOIN land l ON pr.land_id = l.land_id
      JOIN crops c ON pr.crop_id = c.crop_id
      ORDER BY pr.planting_id DESC
    `);

    res.json(records);
  } catch (error) {
    console.error('Error fetching planting records:', error);
    res.status(500).json({
      error: 'Failed to fetch planting records',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

// Get a single planting record by ID
router.get('/api/planting-records/:id', async (req, res) => {
  let connection;

  try {
    const plantingId = Number(req.params.id);

    if (!Number.isInteger(plantingId) || plantingId <= 0) {
      return res.status(400).json({
        error: 'Invalid planting record ID'
      });
    }

    connection = await pool.getConnection();

    const [records] = await connection.query(
      'SELECT * FROM planting_records WHERE planting_id = ?',
      [plantingId]
    );

    if (records.length === 0) {
      return res.status(404).json({
        error: 'Planting record not found'
      });
    }

    res.json(records[0]);
  } catch (error) {
    console.error('Error fetching planting record:', error);
    res.status(500).json({
      error: 'Failed to fetch planting record',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

// Create a new planting record
router.post('/api/planting-records', async (req, res) => {
  let connection;

  try {
    const {
      land_id,
      crop_id,
      planting_date,
      expected_harvest_date,
      quantity_planted,
      quantity_unit,
      fertilizer_used,
      fertilizer_amount,
      notes
    } = req.body;

    if (!land_id || !crop_id || !planting_date) {
      return res.status(400).json({
        error: 'Land, crop, and planting date are required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `INSERT INTO planting_records
      (land_id, crop_id, planting_date, expected_harvest_date,
       quantity_planted, quantity_unit, fertilizer_used,
       fertilizer_amount, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        land_id,
        crop_id,
        planting_date,
        expected_harvest_date || null,
        quantity_planted || null,
        quantity_unit || null,
        fertilizer_used || null,
        fertilizer_amount || null,
        notes || null
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Planting record created successfully',
      planting_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating planting record:', error);
    res.status(500).json({
      error: 'Failed to create planting record',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

// Update a planting record
router.put('/api/planting-records/:id', async (req, res) => {
  let connection;

  try {
    const plantingId = Number(req.params.id);

    if (!Number.isInteger(plantingId) || plantingId <= 0) {
      return res.status(400).json({
        error: 'Invalid planting record ID'
      });
    }

    const {
      land_id,
      crop_id,
      planting_date,
      expected_harvest_date,
      quantity_planted,
      quantity_unit,
      fertilizer_used,
      fertilizer_amount,
      notes
    } = req.body;

    if (!land_id || !crop_id || !planting_date) {
      return res.status(400).json({
        error: 'Land, crop, and planting date are required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `UPDATE planting_records
       SET land_id = ?,
           crop_id = ?,
           planting_date = ?,
           expected_harvest_date = ?,
           quantity_planted = ?,
           quantity_unit = ?,
           fertilizer_used = ?,
           fertilizer_amount = ?,
           notes = ?
       WHERE planting_id = ?`,
      [
        land_id,
        crop_id,
        planting_date,
        expected_harvest_date || null,
        quantity_planted || null,
        quantity_unit || null,
        fertilizer_used || null,
        fertilizer_amount || null,
        notes || null,
        plantingId
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Planting record not found'
      });
    }

    res.json({
      success: true,
      message: 'Planting record updated successfully'
    });
  } catch (error) {
    console.error('Error updating planting record:', error);
    res.status(500).json({
      error: 'Failed to update planting record',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

// Delete a planting record
router.delete('/api/planting-records/:id', async (req, res) => {
  let connection;

  try {
    const plantingId = Number(req.params.id);

    if (!Number.isInteger(plantingId) || plantingId <= 0) {
      return res.status(400).json({
        error: 'Invalid planting record ID'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM planting_records WHERE planting_id = ?',
      [plantingId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Planting record not found'
      });
    }

    res.json({
      success: true,
      message: 'Planting record deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting planting record:', error);
    res.status(500).json({
      error: 'Failed to delete planting record',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;