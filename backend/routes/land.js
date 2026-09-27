const pool = require('../db');

const router = require('express').Router();

router.get('/api/land', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [lands] = await connection.query(`
      SELECT l.*, f.first_name, f.last_name 
      FROM land l 
      JOIN farmers f ON l.farmer_id = f.farmer_id
      ORDER BY l.land_id DESC
    `);
    connection.release();
    res.json(lands);
  } catch (error) {
    console.error('Error fetching land:', error);
    res.status(500).json({ error: 'Failed to fetch land', details: error.message });
  }
});

router.get('/api/land/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [lands] = await connection.query('SELECT * FROM land WHERE land_id = ?', [id]);
    connection.release();

    if (lands.length === 0) {
      return res.status(404).json({ error: 'Land not found' });
    }

    res.json(lands[0]);
  } catch (error) {
    console.error('Error fetching land:', error);
    res.status(500).json({ error: 'Failed to fetch land', details: error.message });
  }
});

router.post('/api/land', async (req, res) => {
  try {
    const { farmer_id, land_name, area, area_unit, soil_type, location } = req.body;

    if (!farmer_id || !area) {
      return res.status(400).json({ error: 'Farmer ID and area are required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO land (farmer_id, land_name, area, area_unit, soil_type, location) VALUES (?, ?, ?, ?, ?, ?)',
      [farmer_id, land_name || null, area, area_unit || 'hectare', soil_type || null, location || null]
    );
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Land created successfully',
      land_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating land:', error);
    res.status(500).json({ error: 'Failed to create land', details: error.message });
  }
});

router.put('/api/land/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { farmer_id, land_name, area, area_unit, soil_type, location } = req.body;

    if (!farmer_id || !area) {
      return res.status(400).json({ error: 'Farmer ID and area are required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'UPDATE land SET farmer_id = ?, land_name = ?, area = ?, area_unit = ?, soil_type = ?, location = ? WHERE land_id = ?',
      [farmer_id, land_name || null, area, area_unit || 'hectare', soil_type || null, location || null, id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Land not found' });
    }

    res.json({ success: true, message: 'Land updated successfully' });
  } catch (error) {
    console.error('Error updating land:', error);
    res.status(500).json({ error: 'Failed to update land', details: error.message });
  }
});

router.delete('/api/land/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM land WHERE land_id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Land not found' });
    }

    res.json({ success: true, message: 'Land deleted successfully' });
  } catch (error) {
    console.error('Error deleting land:', error);
    res.status(500).json({ error: 'Failed to delete land', details: error.message });
  }
});

module.exports = router;
