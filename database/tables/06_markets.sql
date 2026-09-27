CREATE TABLE markets (
    market_id INT AUTO_INCREMENT PRIMARY KEY,
    market_name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100),
    market_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO markets (market_id, market_name, location, contact_person, phone, email, market_type) VALUES
(1, 'Narayanganj Central Market', 'Narayanganj', 'Rahim Uddin', '01712345678', 'narayanganj.market@example.com', 'Wholesale'),
(2, 'Dhaka Agricultural Market', 'Dhaka', 'Sadia Akter', '01823456789', 'dhaka.agri@example.com', 'Wholesale'),
(3, 'Cumilla Farmers Market', 'Cumilla', 'Hasan Mahmud', '01934567890', 'cumilla.farm@example.com', 'Local'),
(4, 'Mymensingh Produce Market', 'Mymensingh', 'Farzana Rahman', '01645678901', 'mymensingh.market@example.com', 'Wholesale'),
(5, 'Gazipur Fresh Produce Market', 'Gazipur', 'Tanvir Ahmed', '01556789012', 'gazipur.produce@example.com', 'Local');