CREATE TABLE  land (
    land_id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_id INT NOT NULL,
    land_name VARCHAR(100),
    area DECIMAL(10, 2),
    area_unit VARCHAR(20),
    soil_type VARCHAR(50),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON DELETE CASCADE
);

INSERT  INTO land (land_id, farmer_id, land_name, area, area_unit, soil_type, location) VALUES
(1, 1, 'North Field', 5.00, 'hectare', 'Loamy', 'Dhaka District'),
(2, 1, 'South Field', 3.00, 'hectare', 'Clay', 'Dhaka District'),
(3, 2, 'Coastal Land', 4.00, 'hectare', 'Sandy Loam', 'Chittagong District'),
(4, 3, 'Hillside Field', 2.00, 'hectare', 'Silty Loam', 'Sylhet District');
