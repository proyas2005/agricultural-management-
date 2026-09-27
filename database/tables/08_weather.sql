CREATE TABLE weather (
    weather_id INT AUTO_INCREMENT PRIMARY KEY,
    land_id INT NOT NULL,
    weather_date DATE NOT NULL,
    temperature_min DECIMAL(5, 2) NOT NULL,
    temperature_max DECIMAL(5, 2) NOT NULL,
    rainfall DECIMAL(10, 2) DEFAULT 0.00,
    humidity DECIMAL(5, 2),
    wind_speed DECIMAL(5, 2) DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (land_id) REFERENCES land(land_id) ON DELETE CASCADE,
    CHECK (temperature_max >= temperature_min),
    CHECK (rainfall >= 0),
    CHECK (humidity >= 0 AND humidity <= 100),
    CHECK (wind_speed >= 0)
);

INSERT INTO weather
(weather_id, land_id, weather_date, temperature_min, temperature_max, rainfall, humidity, wind_speed, notes)
VALUES
(1, 1, '2026-08-23', 25.00, 32.00, 12.50, 78.00, 8.00, 'Light afternoon rain'),
(2, 3, '2026-08-23', 27.00, 34.00, 4.00, 72.00, 11.00, 'Warm and partly cloudy'),
(3, 2, '2026-08-24', 26.00, 33.00, 7.50, 75.00, 9.00, 'Moderate humidity with light rain'),
(4, 4, '2026-08-24', 24.00, 30.00, 15.00, 82.00, 6.00, 'Cloudy weather with rainfall');