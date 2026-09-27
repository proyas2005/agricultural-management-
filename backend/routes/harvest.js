const pool = require('../db');

const router = require('express').Router();

router.get('/api/harvest', async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const [harvests] = await connection.query(`
      SELECT 
        h.*,
        pr.planting_date,
        l.land_name,
        c.crop_name
      FROM harvest h
      JOIN planting_records pr ON h.planting_id = pr.planting_id
      JOIN land l ON pr.land_id = l.land_id
      JOIN crops c ON pr.crop_id = c.crop_id
      ORDER BY h.harvest_date DESC, h.harvest_id DESC
    `);

    res.json(harvests);
  } catch (error) {
    console.error('Error loading harvest records:', error);
    res.status(500).json({
      error: 'Failed to fetch harvests',
      details: error.message
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.get('/api/harvest/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;
    connection = await pool.getConnection();

    const [harvests] = await connection.query(
      'SELECT * FROM harvest WHERE harvest_id = ?',
      [id]
    );

    if (harvests.length === 0) {
      return res.status(404).json({ error: 'Harvest record not found' });
    }

    res.json(harvests[0]);
  } catch (error) {
    console.error('Error loading harvest record:', error);
    res.status(500).json({
      error: 'Failed to fetch harvest',
      details: error.message
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.post('/api/harvest', async (req, res) => {
  let connection;

  try {
    const {
      planting_id,
      harvest_date,
      quantity_harvested,
      quantity_unit,
      quality,
      storage_location,
      notes
    } = req.body;

    if (!planting_id || !harvest_date) {
      return res.status(400).json({
        error: 'Planting record and harvest date are required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `INSERT INTO harvest
      (planting_id, harvest_date, quantity_harvested, quantity_unit, quality, storage_location, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        planting_id,
        harvest_date,
        quantity_harvested || null,
        quantity_unit || null,
        quality || null,
        storage_location || null,
        notes || null
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Harvest created successfully',
      harvest_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating harvest:', error);
    res.status(500).json({
      error: 'Failed to create harvest',
      details: error.message
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.put('/api/harvest/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;
    const {
      planting_id,
      harvest_date,
      quantity_harvested,
      quantity_unit,
      quality,
      storage_location,
      notes
    } = req.body;

    if (!planting_id || !harvest_date) {
      return res.status(400).json({
        error: 'Planting record and harvest date are required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `UPDATE harvest
       SET planting_id = ?,
           harvest_date = ?,
           quantity_harvested = ?,
           quantity_unit = ?,
           quality = ?,
           storage_location = ?,
           notes = ?
       WHERE harvest_id = ?`,
      [
        planting_id,
        harvest_date,
        quantity_harvested || null,
        quantity_unit || null,
        quality || null,
        storage_location || null,
        notes || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Harvest record not found' });
    }

    res.json({
      success: true,
      message: 'Harvest updated successfully'
    });
  } catch (error) {
    console.error('Error updating harvest:', error);
    res.status(500).json({
      error: 'Failed to update harvest',
      details: error.message
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.delete('/api/harvest/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;
    connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM harvest WHERE harvest_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Harvest record not found' });
    }

    res.json({
      success: true,
      message: 'Harvest deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting harvest:', error);
    res.status(500).json({
      error: 'Failed to delete harvest',
      details: error.message
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = router;