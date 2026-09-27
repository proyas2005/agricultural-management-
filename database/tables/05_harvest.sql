CREATE TABLE harvest (
    harvest_id INT AUTO_INCREMENT PRIMARY KEY,
    planting_id INT NOT NULL,
    harvest_date DATE NOT NULL,
    quantity_harvested DECIMAL(10, 2) NOT NULL,
    quantity_unit VARCHAR(20) NOT NULL,
    quality VARCHAR(50),
    storage_location VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (planting_id) REFERENCES planting_records(planting_id) ON DELETE CASCADE
);

INSERT INTO harvest (
    harvest_id,
    planting_id,
    harvest_date,
    quantity_harvested,
    quantity_unit,
    quality,
    storage_location,
    notes
) VALUES
(
    1,
    1,
    '2026-11-25',
    425.50,
    'kg',
    'Premium',
    'Main Storage Room',
    'Harvest was clean and properly dried'
),
(
    2,
    2,
    '2026-12-18',
    295.00,
    'kg',
    'Grade A',
    'Warehouse 1',
    'Good quality with low moisture'
);