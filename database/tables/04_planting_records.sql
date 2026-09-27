CREATE TABLE planting_records (
    planting_id INT AUTO_INCREMENT PRIMARY KEY,
    land_id INT NOT NULL,
    crop_id INT NOT NULL,
    planting_date DATE NOT NULL,
    expected_harvest_date DATE,
    quantity_planted DECIMAL(10, 2),
    quantity_unit VARCHAR(20),
    fertilizer_used VARCHAR(100),
    fertilizer_amount DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (land_id)
        REFERENCES land(land_id)
        ON DELETE CASCADE,

    FOREIGN KEY (crop_id)
        REFERENCES crops(crop_id)
        ON DELETE RESTRICT
);

INSERT INTO planting_records (
    land_id,
    crop_id,
    planting_date,
    expected_harvest_date,
    quantity_planted,
    quantity_unit,
    fertilizer_used,
    fertilizer_amount,
    notes
) VALUES
(
    1,
    1,
    '2026-06-15',
    '2026-11-20',
    80.00,
    'kg',
    'Urea',
    25.00,
    'Healthy early growth'
),
(
    3,
    3,
    '2026-09-10',
    '2026-12-20',
    12.00,
    'kg',
    'Compost',
    40.00,
    'Drip irrigation installed'
);