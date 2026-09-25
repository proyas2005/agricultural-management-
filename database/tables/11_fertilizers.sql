CREATE TABLE fertilizers (
    fertilizer_id INT AUTO_INCREMENT PRIMARY KEY,
    fertilizer_name VARCHAR(100) NOT NULL,
    fertilizer_type VARCHAR(50),
    unit VARCHAR(20) NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CHECK (price_per_unit >= 0)
);

INSERT INTO fertilizers (
    fertilizer_id,
    fertilizer_name,
    fertilizer_type,
    unit,
    price_per_unit,
    description
)
VALUES
(
    1,
    'Urea',
    'Nitrogen Fertilizer',
    'kg',
    30.00,
    'Common nitrogen fertilizer used for crop growth'
),
(
    2,
    'TSP',
    'Phosphate Fertilizer',
    'kg',
    35.00,
    'Used to support root development and plant growth'
),
(
    3,
    'MOP',
    'Potassium Fertilizer',
    'kg',
    28.00,
    'Provides potassium for healthy crop development'
),
(
    4,
    'Compost',
    'Organic Fertilizer',
    'kg',
    15.00,
    'Organic fertilizer used to improve soil condition'
);