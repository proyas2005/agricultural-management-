CREATE TABLE profit_calculation (
    profit_id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_id INT NOT NULL,
    calculation_date DATE NOT NULL,
    total_revenue DECIMAL(12, 2) NOT NULL,
    fertilizer_cost DECIMAL(12, 2) DEFAULT 0.00,
    equipment_rental_cost DECIMAL(12, 2) DEFAULT 0.00,
    other_cost DECIMAL(12, 2) DEFAULT 0.00,
    total_cost DECIMAL(12, 2) NOT NULL,
    net_profit DECIMAL(12, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (farmer_id)
        REFERENCES farmers(farmer_id)
        ON DELETE CASCADE,

    CHECK (total_revenue >= 0),
    CHECK (fertilizer_cost >= 0),
    CHECK (equipment_rental_cost >= 0),
    CHECK (other_cost >= 0),
    CHECK (total_cost >= 0)
);

INSERT INTO profit_calculation (
    profit_id,
    farmer_id,
    calculation_date,
    total_revenue,
    fertilizer_cost,
    equipment_rental_cost,
    other_cost,
    total_cost,
    net_profit,
    notes
)
VALUES
(
    1,
    1,
    '2026-11-28',
    24790.00,
    1275.00,
    4500.00,
    1000.00,
    6775.00,
    18015.00,
    'Profit calculated from crop sales and farming costs'
),
(
    2,
    2,
    '2026-12-26',
    21600.00,
    600.00,
    1800.00,
    800.00,
    3200.00,
    18400.00,
    'Profit calculated after fertilizer and equipment rental costs'
),
(
    3,
    3,
    '2026-10-03',
    15000.00,
    900.00,
    4500.00,
    700.00,
    6100.00,
    8900.00,
    'Estimated profit from farming activities'
);