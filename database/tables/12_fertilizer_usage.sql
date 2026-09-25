CREATE TABLE fertilizer_usage (
    usage_id INT AUTO_INCREMENT PRIMARY KEY,
    planting_id INT NOT NULL,
    fertilizer_id INT NOT NULL,
    usage_date DATE NOT NULL,
    quantity_used DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    cost DECIMAL(12, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (planting_id)
        REFERENCES planting_records(planting_id)
        ON DELETE CASCADE,

    FOREIGN KEY (fertilizer_id)
        REFERENCES fertilizers(fertilizer_id)
        ON DELETE CASCADE,

    CHECK (quantity_used > 0),
    CHECK (cost >= 0)
);

INSERT INTO fertilizer_usage (
    usage_id,
    planting_id,
    fertilizer_id,
    usage_date,
    quantity_used,
    unit,
    cost,
    notes
)
VALUES
(
    1,
    1,
    1,
    '2026-06-20',
    25.00,
    'kg',
    750.00,
    'Urea applied during early crop growth'
),
(
    2,
    1,
    2,
    '2026-07-05',
    15.00,
    'kg',
    525.00,
    'TSP applied for root development'
),
(
    3,
    2,
    4,
    '2026-09-15',
    40.00,
    'kg',
    600.00,
    'Compost applied before crop establishment'
);