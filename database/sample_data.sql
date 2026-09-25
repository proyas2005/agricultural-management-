-- ============================================================
-- sample_data.sql
-- Sample/demo data for the Agriculture Management System.
-- Column names match the actual table schemas in tables/*.sql
-- ============================================================

USE agriculture_db;

-- Clear existing rows (order matters due to FKs)
DELETE FROM fertilizer_usage;
DELETE FROM equipment_rental;
DELETE FROM profit_calculation;
DELETE FROM sales;
DELETE FROM harvest;
DELETE FROM planting_records;
DELETE FROM weather;
DELETE FROM land;
DELETE FROM crops;
DELETE FROM equipment;
DELETE FROM markets;
DELETE FROM fertilizers;
DELETE FROM farmers;

-- Reset AUTO_INCREMENT
ALTER TABLE farmers            AUTO_INCREMENT = 1;
ALTER TABLE land               AUTO_INCREMENT = 1;
ALTER TABLE crops              AUTO_INCREMENT = 1;
ALTER TABLE planting_records   AUTO_INCREMENT = 1;
ALTER TABLE harvest            AUTO_INCREMENT = 1;
ALTER TABLE markets            AUTO_INCREMENT = 1;
ALTER TABLE sales              AUTO_INCREMENT = 1;
ALTER TABLE weather            AUTO_INCREMENT = 1;
ALTER TABLE equipment          AUTO_INCREMENT = 1;
ALTER TABLE equipment_rental   AUTO_INCREMENT = 1;
ALTER TABLE fertilizers        AUTO_INCREMENT = 1;
ALTER TABLE fertilizer_usage   AUTO_INCREMENT = 1;
ALTER TABLE profit_calculation AUTO_INCREMENT = 1;


-- Farmers
INSERT INTO farmers (first_name, last_name, email, phone, address, city, state, postal_code, country, experience_years) VALUES
('Rahim',  'Uddin',  'rahim.uddin@example.com',  '01711111222', 'Village A', 'Dhaka',      'Dhaka',      '1200', 'Bangladesh', 12),
('Nusrat', 'Jahan',  'nusrat.jahan@example.com', '01822222333', 'Village B', 'Chittagong', 'Chittagong', '4000', 'Bangladesh',  8),
('Sajed',  'Ali',    'sajed.ali@example.com',    '01933333444', 'Village C', 'Sylhet',     'Sylhet',     '3100', 'Bangladesh', 15),
('Mina',   'Akter',  'mina.akter@example.com',   '01644444555', 'Village D', 'Rajshahi',   'Rajshahi',   '6000', 'Bangladesh',  6),
('Karim',  'Hasan',  'karim.hasan@example.com',  '01818888444', 'Village E', 'Gazipur',    'Dhaka',      '1700', 'Bangladesh',  2);


-- Crops
INSERT INTO crops (crop_name, crop_type, description, planting_season, harvest_season, avg_yield_per_area, yield_unit) VALUES
('Rice',      'Cereal',    'Main staple crop',       'June-July',   'November-December',  4000.00, 'kg/hectare'),
('Wheat',     'Cereal',    'Winter crop',            'November',    'March-April',        3000.00, 'kg/hectare'),
('Jute',      'Fiber',     'Cash crop',              'March-April', 'July-August',        2500.00, 'kg/hectare'),
('Potato',    'Vegetable', 'Vegetable crop',         'November',    'February-March',    12000.00, 'kg/hectare'),
('Sugarcane', 'Cash Crop', 'Long-duration crop',     'October',     'November-December', 70000.00, 'kg/hectare');


-- Land
INSERT INTO land (farmer_id, land_name, area, area_unit, soil_type, location) VALUES
(1, 'Rahim Rice Field',     2.50, 'acre', 'Loamy',    'Village A'),
(2, 'Nusrat Jute Plot',     1.20, 'acre', 'Clay',     'Village B'),
(3, 'Sajed Sugarcane Farm', 4.00, 'acre', 'Alluvial', 'Village C'),
(4, 'Mina Potato Plot',     0.80, 'acre', 'Sandy',    'Village D'),
(5, 'Karim Wheat Field',    1.50, 'acre', 'Loamy',    'Village E');


-- Planting Records
INSERT INTO planting_records (land_id, crop_id, planting_date, expected_harvest_date, quantity_planted, quantity_unit, fertilizer_used, fertilizer_amount, notes) VALUES
(1, 1, '2026-06-15', '2026-11-20',  50.00, 'kg', 'Urea',    25.00, 'Rice season 1'),
(2, 3, '2026-04-01', '2026-07-25',  30.00, 'kg', 'Compost', 40.00, 'Jute season'),
(3, 5, '2026-10-05', '2026-12-15', 200.00, 'kg', 'Urea',    60.00, 'Sugarcane plantation'),
(4, 4, '2026-11-10', '2027-02-28', 150.00, 'kg', 'Potash',  35.00, 'Potato season'),
(5, 2, '2026-11-15', '2027-03-30',  40.00, 'kg', 'Urea',    20.00, 'Wheat season');


-- Weather
INSERT INTO weather (land_id, weather_date, temperature_min, temperature_max, rainfall, humidity, wind_speed, notes) VALUES
(1, '2026-07-10', 26.50, 33.00, 12.50, 78.00, 8.20, 'Monsoon rain'),
(2, '2026-05-20', 24.00, 35.50,  5.00, 65.00, 6.10, 'Warm day'),
(3, '2026-10-15', 22.00, 31.50,  0.00, 55.00, 4.00, 'Dry clear day'),
(4, '2026-11-25', 15.00, 27.00,  0.00, 60.00, 3.50, 'Cool and dry'),
(5, '2026-12-05', 12.50, 25.00,  0.00, 68.00, 5.20, 'Winter morning');


-- Equipment
INSERT INTO equipment (equipment_name, equipment_type, owner_name, rental_price_per_day, description, availability) VALUES
('Kubota Tractor',    'Tractor',           'Green Field Services',  3500.00, 'Compact tractor',       1),
('Rice Transplanter', 'Planter',           'Agri Tools Bangladesh', 2200.00, 'Rice planting machine', 1),
('Power Tiller',      'Tiller',            'Modern Agro Services',  1800.00, 'Compact soil tiller',   1),
('Water Pump',        'Irrigation',        'Farm Equipment Center', 1200.00, 'Diesel water pump',     1),
('John Deere 5050D',  'Tractor',           'Rahim Uddin',           3500.00, 'Heavy-duty tractor',    1),
('Rotary Tiller',     'Tillage Equipment', 'Monir Hossain',         1800.00, 'Rotary tillage',        1);


-- Equipment Rental
INSERT INTO equipment_rental (farmer_id, equipment_id, rental_date, return_date, rental_days, rental_cost, status, notes) VALUES
(1, 1, '2026-06-20', '2026-06-23', 3, 10500.00, 'Completed', 'Tractor for land prep'),
(2, 2, '2026-04-10', '2026-04-12', 2,  4400.00, 'Completed', 'Rice transplanter'),
(3, 3, '2026-10-08', '2026-10-12', 4,  7200.00, 'Completed', 'Power tiller'),
(4, 4, '2026-11-15', '2026-11-18', 3,  3600.00, 'Completed', 'Water pump for irrigation'),
(5, 1, '2026-11-20', '2026-11-23', 3, 10500.00, 'Active',    'Tractor for wheat field');


-- Markets
INSERT INTO markets (market_name, location, contact_person, phone, email, market_type) VALUES
('Dhaka Wholesale Market', 'Dhaka',      'Mr. Kamal',  '01700000001', 'dhaka@markets.example.com',    'Wholesale'),
('Chittagong Bazaar',      'Chittagong', 'Mr. Rafiq',  '01700000002', 'ctg@markets.example.com',      'Retail'),
('Sylhet Local Market',    'Sylhet',     'Mr. Salam',  '01700000003', 'sylhet@markets.example.com',   'Local'),
('Rajshahi Grain Market',  'Rajshahi',   'Mrs. Amina', '01700000004', 'rajshahi@markets.example.com', 'Grain');


-- Harvest
INSERT INTO harvest (planting_id, harvest_date, quantity_harvested, quantity_unit, quality, storage_location, notes) VALUES
(1, '2026-11-22',  9000.00, 'kg', 'Premium', 'Rahim Warehouse',  'Rice harvest'),
(2, '2026-07-28',  4500.00, 'kg', 'Grade A', 'Nusrat Warehouse', 'Jute harvest'),
(3, '2026-12-18', 45000.00, 'kg', 'Grade A', 'Sajed Warehouse',  'Sugarcane harvest'),
(4, '2027-03-02',  8500.00, 'kg', 'Premium', 'Mina Storage',     'Potato harvest'),
(5, '2027-04-02',  3800.00, 'kg', 'Grade B', 'Karim Storage',    'Wheat harvest');


-- Sales
INSERT INTO sales (harvest_id, market_id, sale_date, quantity_sold, quantity_unit, price_per_unit, total_sale_amount, notes) VALUES
(1, 1, '2026-11-25',  8000.00, 'kg', 26.00, 208000.00, 'Rice sale'),
(2, 2, '2026-08-01',  4200.00, 'kg', 42.00, 176400.00, 'Jute sale'),
(3, 3, '2026-12-22', 40000.00, 'kg',  3.50, 140000.00, 'Sugarcane sale'),
(4, 4, '2027-03-05',  8000.00, 'kg', 30.00, 240000.00, 'Potato sale'),
(5, 1, '2027-04-05',  3500.00, 'kg', 34.00, 119000.00, 'Wheat sale');


-- Fertilizers
INSERT INTO fertilizers (fertilizer_name, fertilizer_type, unit, price_per_unit, description) VALUES
('Urea',    'Nitrogen',  'kg', 27.00, 'High-nitrogen fertilizer'),
('TSP',     'Phosphate', 'kg', 30.00, 'Phosphorus source'),
('Potash',  'Potassium', 'kg', 25.00, 'Potassium source'),
('Compost', 'Organic',   'kg', 10.00, 'Organic compost'),
('DAP',     'Compound',  'kg', 35.00, 'Compound fertilizer');


-- Fertilizer Usage
INSERT INTO fertilizer_usage (planting_id, fertilizer_id, usage_date, quantity_used, unit, cost, notes) VALUES
(1, 1, '2026-07-01', 30.00, 'kg',  810.00, 'Urea for rice'),
(1, 4, '2026-07-15', 20.00, 'kg',  200.00, 'Compost for rice'),
(2, 2, '2026-04-15', 15.00, 'kg',  450.00, 'TSP for jute'),
(3, 1, '2026-10-20', 50.00, 'kg', 1350.00, 'Urea for sugarcane'),
(4, 3, '2026-11-20', 40.00, 'kg', 1000.00, 'Potash for potato'),
(5, 5, '2026-11-25', 25.00, 'kg',  875.00, 'DAP for wheat');


-- Profit Calculation
INSERT INTO profit_calculation (farmer_id, calculation_date, total_revenue, fertilizer_cost, equipment_rental_cost, other_cost, total_cost, net_profit, notes) VALUES
(1, '2026-11-30', 208000.00, 1010.00, 10500.00, 1000.00, 12510.00, 195490.00, 'Rice season profit'),
(2, '2026-08-10', 176400.00,  450.00,  4400.00,  800.00,  5650.00, 170750.00, 'Jute season profit'),
(3, '2026-12-30', 140000.00, 1350.00,  7200.00,  700.00,  9250.00, 130750.00, 'Sugarcane profit'),
(4, '2027-03-10', 240000.00, 1000.00,  3600.00,  900.00,  5500.00, 234500.00, 'Potato profit'),
(5, '2027-04-10', 119000.00,  875.00, 10500.00,  600.00, 11975.00, 107025.00, 'Wheat profit');