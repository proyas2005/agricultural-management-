const pool = require('../db');

const router = require('express').Router();

router.get('/api/markets', async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const [markets] = await connection.query(
      'SELECT * FROM markets ORDER BY market_name ASC'
    );

    res.json(markets);
  } catch (error) {
    console.error('Error loading markets:', error);
    res.status(500).json({
      error: 'Failed to fetch markets',
      details: error.message
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.get('/api/markets/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;
    connection = await pool.getConnection();

    const [markets] = await connection.query(
      'SELECT * FROM markets WHERE market_id = ?',
      [id]
    );

    if (markets.length === 0) {
      return res.status(404).json({ error: 'Market not found' });
    }

    res.json(markets[0]);
  } catch (error) {
    console.error('Error loading market:', error);
    res.status(500).json({
      error: 'Failed to fetch market',
      details: error.message
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.post('/api/markets', async (req, res) => {
  let connection;

  try {
    const {
      market_name,
      location,
      contact_person,
      phone,
      email,
      market_type
    } = req.body;

    if (!market_name || !location) {
      return res.status(400).json({
        error: 'Market name and location are required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `INSERT INTO markets
      (market_name, location, contact_person, phone, email, market_type)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        market_name,
        location,
        contact_person || null,
        phone || null,
        email || null,
        market_type || null
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Market created successfully',
      market_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating market:', error);
    res.status(500).json({
      error: 'Failed to create market',
      details: error.message
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.put('/api/markets/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;
    const {
      market_name,
      location,
      contact_person,
      phone,
      email,
      market_type
    } = req.body;

    if (!market_name || !location) {
      return res.status(400).json({
        error: 'Market name and location are required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `UPDATE markets
       SET market_name = ?,
           location = ?,
           contact_person = ?,
           phone = ?,
           email = ?,
           market_type = ?
       WHERE market_id = ?`,
      [
        market_name,
        location,
        contact_person || null,
        phone || null,
        email || null,
        market_type || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Market not found' });
    }

    res.json({
      success: true,
      message: 'Market updated successfully'
    });
  } catch (error) {
    console.error('Error updating market:', error);
    res.status(500).json({
      error: 'Failed to update market',
      details: error.message
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.delete('/api/markets/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;
    connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM markets WHERE market_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Market not found' });
    }

    res.json({
      success: true,
      message: 'Market deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting market:', error);
    res.status(500).json({
      error: 'Failed to delete market',
      details: error.message
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = router;