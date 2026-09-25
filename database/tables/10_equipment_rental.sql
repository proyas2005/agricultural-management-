CREATE TABLE equipment_rental (
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_id INT NOT NULL,
    equipment_id INT NOT NULL,
    rental_date DATE NOT NULL,
    return_date DATE,
    rental_days INT NOT NULL,
    rental_cost DECIMAL(12, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'Requested',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (farmer_id)
        REFERENCES farmers(farmer_id)
        ON DELETE CASCADE,

    FOREIGN KEY (equipment_id)
        REFERENCES equipment(equipment_id)
        ON DELETE CASCADE,

    CHECK (rental_days > 0),
    CHECK (rental_cost >= 0)
);

INSERT INTO equipment_rental (
    rental_id,
    farmer_id,
    equipment_id,
    rental_date,
    return_date,
    rental_days,
    rental_cost,
    status,
    notes
)
VALUES
(
    1,
    1,
    1,
    '2026-09-20',
    '2026-09-22',
    3,
    4500.00,
    'Approved',
    'Tractor rented for land preparation'
),
(
    2,
    2,
    2,
    '2026-09-25',
    '2026-09-26',
    2,
    1800.00,
    'Requested',
    'Power tiller requested for field work'
),
(
    3,
    3,
    1,
    '2026-10-01',
    '2026-10-03',
    3,
    4500.00,
    'Completed',
    'Equipment returned after field preparation'
);