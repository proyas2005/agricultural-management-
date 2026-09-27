const pool = require('../db');

const router = require('express').Router();

router.get('/api/sales', async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const [sales] = await connection.query(`
      SELECT
        s.sale_id,
        s.harvest_id,
        s.market_id,
        s.sale_date,
        s.quantity_sold,
        s.quantity_unit,
        s.price_per_unit,
        s.total_sale_amount,
        s.notes,
        m.market_name,
        l.land_name,
        c.crop_name
      FROM sales s
      LEFT JOIN markets m ON s.market_id = m.market_id
      JOIN harvest h ON s.harvest_id = h.harvest_id
      JOIN planting_records pr ON h.planting_id = pr.planting_id
      JOIN land l ON pr.land_id = l.land_id
      JOIN crops c ON pr.crop_id = c.crop_id
      ORDER BY s.sale_date DESC, s.sale_id DESC
    `);

    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({
      error: 'Failed to fetch sales',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.get('/api/sales/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;

    connection = await pool.getConnection();

    const [sales] = await connection.query(
      'SELECT * FROM sales WHERE sale_id = ?',
      [id]
    );

    if (sales.length === 0) {
      return res.status(404).json({ error: 'Sale not found' });
    }

    res.json(sales[0]);
  } catch (error) {
    console.error('Error fetching sale:', error);
    res.status(500).json({
      error: 'Failed to fetch sale',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.post('/api/sales', async (req, res) => {
  let connection;

  try {
    const {
      harvest_id,
      market_id,
      sale_date,
      quantity_sold,
      quantity_unit,
      price_per_unit,
      total_sale_amount,
      notes
    } = req.body;

    if (!harvest_id || !sale_date) {
      return res.status(400).json({
        error: 'Harvest and sale date are required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `INSERT INTO sales
      (harvest_id, market_id, sale_date, quantity_sold, quantity_unit,
       price_per_unit, total_sale_amount, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        harvest_id,
        market_id || null,
        sale_date,
        quantity_sold || null,
        quantity_unit || null,
        price_per_unit || null,
        total_sale_amount || null,
        notes || null
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Sale created successfully',
      sale_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({
      error: 'Failed to create sale',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.put('/api/sales/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;

    const {
      harvest_id,
      market_id,
      sale_date,
      quantity_sold,
      quantity_unit,
      price_per_unit,
      total_sale_amount,
      notes
    } = req.body;

    if (!harvest_id || !sale_date) {
      return res.status(400).json({
        error: 'Harvest and sale date are required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `UPDATE sales
       SET harvest_id = ?,
           market_id = ?,
           sale_date = ?,
           quantity_sold = ?,
           quantity_unit = ?,
           price_per_unit = ?,
           total_sale_amount = ?,
           notes = ?
       WHERE sale_id = ?`,
      [
        harvest_id,
        market_id || null,
        sale_date,
        quantity_sold || null,
        quantity_unit || null,
        price_per_unit || null,
        total_sale_amount || null,
        notes || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Sale not found'
      });
    }

    res.json({
      success: true,
      message: 'Sale updated successfully'
    });
  } catch (error) {
    console.error('Error updating sale:', error);
    res.status(500).json({
      error: 'Failed to update sale',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.delete('/api/sales/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;

    connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM sales WHERE sale_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Sale not found'
      });
    }

    res.json({
      success: true,
      message: 'Sale deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({
      error: 'Failed to delete sale',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;