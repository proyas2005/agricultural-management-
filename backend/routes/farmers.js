const pool = require('../db');

const router = require('express').Router();

router.get('/api/farmers', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [farmers] = await connection.query('SELECT * FROM farmers ORDER BY farmer_id DESC');
    connection.release();
    res.json(farmers);
  } catch (error) {
    console.error('Error fetching farmers:', error);
    res.status(500).json({ error: 'Failed to fetch farmers', details: error.message });
  }
});

router.get('/api/farmers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [farmers] = await connection.query('SELECT * FROM farmers WHERE farmer_id = ?', [id]);
    connection.release();

    if (farmers.length === 0) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    res.json(farmers[0]);
  } catch (error) {
    console.error('Error fetching farmer:', error);
    res.status(500).json({ error: 'Failed to fetch farmer', details: error.message });
  }
});

router.post('/api/farmers', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address, city, state, postal_code, country, experience_years } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO farmers (first_name, last_name, email, phone, address, city, state, postal_code, country, experience_years) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email || null, phone || null, address || null, city || null, state || null, postal_code || null, country || null, experience_years || 0]
    );
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Farmer created successfully',
      farmer_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating farmer:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create farmer', details: error.message });
  }
});

router.put('/api/farmers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone, address, city, state, postal_code, country, experience_years } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'UPDATE farmers SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, postal_code = ?, country = ?, experience_years = ? WHERE farmer_id = ?',
      [first_name, last_name, email || null, phone || null, address || null, city || null, state || null, postal_code || null, country || null, experience_years || 0, id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    res.json({ success: true, message: 'Farmer updated successfully' });
  } catch (error) {
    console.error('Error updating farmer:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to update farmer', details: error.message });
  }
});

router.delete('/api/farmers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM farmers WHERE farmer_id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    res.json({ success: true, message: 'Farmer deleted successfully' });
  } catch (error) {
    console.error('Error deleting farmer:', error);
    res.status(500).json({ error: 'Failed to delete farmer', details: error.message });
  }
});

module.exports = router;
