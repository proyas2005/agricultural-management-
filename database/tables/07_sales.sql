CREATE TABLE sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    harvest_id INT NOT NULL,
    market_id INT,
    sale_date DATE NOT NULL,
    quantity_sold DECIMAL(10, 2) NOT NULL,
    quantity_unit VARCHAR(20) NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    total_sale_amount DECIMAL(12, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (harvest_id)
        REFERENCES harvest(harvest_id)
        ON DELETE CASCADE,

    FOREIGN KEY (market_id)
        REFERENCES markets(market_id)
        ON DELETE SET NULL,

    CHECK (quantity_sold > 0),
    CHECK (price_per_unit >= 0),
    CHECK (total_sale_amount >= 0)
);

INSERT INTO sales (
    sale_id,
    harvest_id,
    market_id,
    sale_date,
    quantity_sold,
    quantity_unit,
    price_per_unit,
    total_sale_amount,
    notes
)
VALUES
(
    1,
    1,
    1,
    '2026-11-25',
    350.00,
    'kg',
    65.00,
    22750.00,
    'Wholesale sale'
),
(
    2,
    2,
    2,
    '2026-12-26',
    240.00,
    'kg',
    90.00,
    21600.00,
    'First quality batch'
),
(
    3,
    1,
    2,
    '2026-11-28',
    30.00,
    'kg',
    68.00,
    2040.00,
    'Local market sale'
);