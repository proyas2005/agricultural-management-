const pool = require('../db');

const router = require('express').Router();

// Get all crops
router.get('/api/crops', async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const [crops] = await connection.query(
      'SELECT * FROM crops ORDER BY crop_id DESC'
    );

    res.json(crops);
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({
      error: 'Failed to fetch crops',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

// Get a single crop by ID
router.get('/api/crops/:id', async (req, res) => {
  let connection;

  try {
    const cropId = Number(req.params.id);

    // Validate crop ID
    if (!Number.isInteger(cropId) || cropId <= 0) {
      return res.status(400).json({
        error: 'Invalid crop ID'
      });
    }

    connection = await pool.getConnection();

    const [crops] = await connection.query(
      'SELECT * FROM crops WHERE crop_id = ?',
      [cropId]
    );

    if (crops.length === 0) {
      return res.status(404).json({
        error: 'Crop not found'
      });
    }

    res.json(crops[0]);
  } catch (error) {
    console.error('Error fetching crop:', error);
    res.status(500).json({
      error: 'Failed to fetch crop',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

// Create a new crop
router.post('/api/crops', async (req, res) => {
  let connection;

  try {
    const {
      crop_name,
      crop_type,
      description,
      planting_season,
      harvest_season,
      avg_yield_per_area,
      yield_unit
    } = req.body;

    // Validate crop name
    const cropName = crop_name?.trim();

    if (!cropName) {
      return res.status(400).json({
        error: 'Crop name is required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `INSERT INTO crops
      (crop_name, crop_type, description, planting_season,
       harvest_season, avg_yield_per_area, yield_unit)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        cropName,
        crop_type || null,
        description || null,
        planting_season || null,
        harvest_season || null,
        avg_yield_per_area || null,
        yield_unit || null
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Crop created successfully',
      crop_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating crop:', error);
    res.status(500).json({
      error: 'Failed to create crop',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

// Update an existing crop
router.put('/api/crops/:id', async (req, res) => {
  let connection;

  try {
    const cropId = Number(req.params.id);

    // Validate crop ID
    if (!Number.isInteger(cropId) || cropId <= 0) {
      return res.status(400).json({
        error: 'Invalid crop ID'
      });
    }

    const {
      crop_name,
      crop_type,
      description,
      planting_season,
      harvest_season,
      avg_yield_per_area,
      yield_unit
    } = req.body;

    // Validate crop name
    const cropName = crop_name?.trim();

    if (!cropName) {
      return res.status(400).json({
        error: 'Crop name is required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `UPDATE crops
       SET crop_name = ?,
           crop_type = ?,
           description = ?,
           planting_season = ?,
           harvest_season = ?,
           avg_yield_per_area = ?,
           yield_unit = ?
       WHERE crop_id = ?`,
      [
        cropName,
        crop_type || null,
        description || null,
        planting_season || null,
        harvest_season || null,
        avg_yield_per_area || null,
        yield_unit || null,
        cropId
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Crop not found'
      });
    }

    res.json({
      success: true,
      message: 'Crop updated successfully'
    });
  } catch (error) {
    console.error('Error updating crop:', error);
    res.status(500).json({
      error: 'Failed to update crop',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

// Delete a crop
router.delete('/api/crops/:id', async (req, res) => {
  let connection;

  try {
    const cropId = Number(req.params.id);

    // Validate crop ID
    if (!Number.isInteger(cropId) || cropId <= 0) {
      return res.status(400).json({
        error: 'Invalid crop ID'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM crops WHERE crop_id = ?',
      [cropId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Crop not found'
      });
    }

    res.json({
      success: true,
      message: 'Crop deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting crop:', error);
    res.status(500).json({
      error: 'Failed to delete crop',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;