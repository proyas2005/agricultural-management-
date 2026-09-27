CREATE TABLE crops (
    crop_id INT AUTO_INCREMENT PRIMARY KEY,
    crop_name VARCHAR(100) NOT NULL,
    crop_type VARCHAR(50),
    description TEXT,
    planting_season VARCHAR(50),
    harvest_season VARCHAR(50),
    avg_yield_per_area DECIMAL(10, 2),
    yield_unit VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO crops (
    crop_name,
    crop_type,
    description,
    planting_season,
    harvest_season,
    avg_yield_per_area,
    yield_unit
) VALUES
(
    'Rice',
    'Cereal',
    'Staple food crop',
    'June-July',
    'November-December',
    50.00,
    'kg/hectare'
),
(
    'Wheat',
    'Cereal',
    'Winter crop',
    'October-November',
    'March-April',
    40.00,
    'kg/hectare'
),
(
    'Tomato',
    'Vegetable',
    'High demand vegetable',
    'September-October',
    'December-January',
    30.00,
    'tons/hectare'
),
(
    'Potato',
    'Vegetable',
    'Staple vegetable crop',
    'August-September',
    'November-December',
    25.00,
    'tons/hectare'
);