const pool = require('../db');

const router = require('express').Router();

router.get('/api/equipment', async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const [equipmentList] = await connection.query(
      'SELECT * FROM equipment ORDER BY equipment_id DESC'
    );

    res.json(equipmentList);
  } catch (error) {
    console.error('Error loading equipment:', error);
    res.status(500).json({
      error: 'Failed to load equipment',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.get('/api/equipment/:id', async (req, res) => {
  let connection;

  try {
    const equipmentId = req.params.id;

    connection = await pool.getConnection();

    const [equipmentList] = await connection.query(
      'SELECT * FROM equipment WHERE equipment_id = ?',
      [equipmentId]
    );

    if (equipmentList.length === 0) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    res.json(equipmentList[0]);
  } catch (error) {
    console.error('Error loading equipment:', error);
    res.status(500).json({
      error: 'Failed to load equipment',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.post('/api/equipment', async (req, res) => {
  let connection;

  try {
    const {
      equipment_name,
      equipment_type,
      owner_name,
      rental_price_per_day,
      description,
      availability
    } = req.body;

    if (!equipment_name || equipment_name.trim() === '') {
      return res.status(400).json({
        error: 'Equipment name is required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `INSERT INTO equipment
      (equipment_name, equipment_type, owner_name, rental_price_per_day, description, availability)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        equipment_name.trim(),
        equipment_type || null,
        owner_name || null,
        rental_price_per_day || null,
        description || null,
        availability === undefined ? true : availability
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Equipment added successfully',
      equipment_id: result.insertId
    });
  } catch (error) {
    console.error('Error adding equipment:', error);
    res.status(500).json({
      error: 'Failed to add equipment',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.put('/api/equipment/:id', async (req, res) => {
  let connection;

  try {
    const equipmentId = req.params.id;

    const {
      equipment_name,
      equipment_type,
      owner_name,
      rental_price_per_day,
      description,
      availability
    } = req.body;

    if (!equipment_name || equipment_name.trim() === '') {
      return res.status(400).json({
        error: 'Equipment name is required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `UPDATE equipment
       SET equipment_name = ?,
           equipment_type = ?,
           owner_name = ?,
           rental_price_per_day = ?,
           description = ?,
           availability = ?
       WHERE equipment_id = ?`,
      [
        equipment_name.trim(),
        equipment_type || null,
        owner_name || null,
        rental_price_per_day || null,
        description || null,
        availability === undefined ? true : availability,
        equipmentId
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Equipment not found'
      });
    }

    res.json({
      success: true,
      message: 'Equipment updated successfully'
    });
  } catch (error) {
    console.error('Error updating equipment:', error);
    res.status(500).json({
      error: 'Failed to update equipment',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.delete('/api/equipment/:id', async (req, res) => {
  let connection;

  try {
    const equipmentId = req.params.id;

    connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM equipment WHERE equipment_id = ?',
      [equipmentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Equipment not found'
      });
    }

    res.json({
      success: true,
      message: 'Equipment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({
      error: 'Failed to delete equipment',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;