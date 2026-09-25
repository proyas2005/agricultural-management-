const pool = require('../db');

const router = require('express').Router();

router.get('/api/weather', async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const [weatherData] = await connection.query(`
      SELECT
        w.weather_id,
        w.land_id,
        w.weather_date,
        w.temperature_min,
        w.temperature_max,
        w.rainfall,
        w.humidity,
        w.wind_speed,
        w.notes,
        l.land_name
      FROM weather w
      JOIN land l ON w.land_id = l.land_id
      ORDER BY w.weather_date DESC, w.weather_id DESC
    `);

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather records:', error);
    res.status(500).json({
      error: 'Failed to fetch weather records',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.get('/api/weather/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;

    connection = await pool.getConnection();

    const [weatherData] = await connection.query(
      'SELECT * FROM weather WHERE weather_id = ?',
      [id]
    );

    if (weatherData.length === 0) {
      return res.status(404).json({
        error: 'Weather record not found'
      });
    }

    res.json(weatherData[0]);
  } catch (error) {
    console.error('Error fetching weather record:', error);
    res.status(500).json({
      error: 'Failed to fetch weather record',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.post('/api/weather', async (req, res) => {
  let connection;

  try {
    const {
      land_id,
      weather_date,
      temperature_min,
      temperature_max,
      rainfall,
      humidity,
      wind_speed,
      notes
    } = req.body;

    if (!land_id || !weather_date) {
      return res.status(400).json({
        error: 'Land and weather date are required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `INSERT INTO weather
      (land_id, weather_date, temperature_min, temperature_max,
       rainfall, humidity, wind_speed, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        land_id,
        weather_date,
        temperature_min || null,
        temperature_max || null,
        rainfall || null,
        humidity || null,
        wind_speed || null,
        notes || null
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Weather record created successfully',
      weather_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating weather:', error);
    res.status(500).json({
      error: 'Failed to create weather record',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.put('/api/weather/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;

    const {
      land_id,
      weather_date,
      temperature_min,
      temperature_max,
      rainfall,
      humidity,
      wind_speed,
      notes
    } = req.body;

    if (!land_id || !weather_date) {
      return res.status(400).json({
        error: 'Land and weather date are required'
      });
    }

    connection = await pool.getConnection();

    const [result] = await connection.query(
      `UPDATE weather
       SET land_id = ?,
           weather_date = ?,
           temperature_min = ?,
           temperature_max = ?,
           rainfall = ?,
           humidity = ?,
           wind_speed = ?,
           notes = ?
       WHERE weather_id = ?`,
      [
        land_id,
        weather_date,
        temperature_min || null,
        temperature_max || null,
        rainfall || null,
        humidity || null,
        wind_speed || null,
        notes || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Weather record not found'
      });
    }

    res.json({
      success: true,
      message: 'Weather record updated successfully'
    });
  } catch (error) {
    console.error('Error updating weather:', error);
    res.status(500).json({
      error: 'Failed to update weather record',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

router.delete('/api/weather/:id', async (req, res) => {
  let connection;

  try {
    const { id } = req.params;

    connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM weather WHERE weather_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Weather record not found'
      });
    }

    res.json({
      success: true,
      message: 'Weather record deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting weather:', error);
    res.status(500).json({
      error: 'Failed to delete weather record',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;