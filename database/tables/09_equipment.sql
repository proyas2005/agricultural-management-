CREATE TABLE equipment (
    equipment_id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_name VARCHAR(100) NOT NULL,
    equipment_type VARCHAR(50) NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    rental_price_per_day DECIMAL(10, 2) NOT NULL,
    description TEXT,
    availability BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CHECK (rental_price_per_day >= 0)
);

INSERT INTO equipment
(equipment_id, equipment_name, equipment_type, owner_name, rental_price_per_day, description, availability)
VALUES
(1, 'Kubota Tractor', 'Tractor', 'Green Field Services', 3500.00, '45 HP tractor for plowing and transport', TRUE),
(2, 'Rice Transplanter', 'Planter', 'Agri Tools Bangladesh', 2200.00, 'Six-row rice planting machine', TRUE),
(3, 'Power Tiller', 'Tiller', 'Modern Agro Services', 1800.00, 'Compact machine for soil preparation', TRUE),
(4, 'Water Pump', 'Irrigation', 'Farm Equipment Center', 1200.00, 'Water pump for field irrigation', FALSE);