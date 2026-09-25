CREATE TABLE  farmers (
    farmer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    experience_years INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT  INTO farmers (farmer_id, first_name, last_name, email, phone, address, city, state, postal_code, country, experience_years) VALUES
(1, 'Rahim', 'Uddin', 'rahim.uddin@example.com', '01711112222', 'House 12, Block A', 'Dhaka', 'Dhaka', '1205', 'Bangladesh', 12),
(2, 'Nusrat', 'Jahan', 'nusrat.jahan@example.com', '01822223333', 'Road 4, Chawkbazar', 'Chittagong', 'Chittagong', '4203', 'Bangladesh', 8),
(3, 'Sajed', 'Ali', 'sajed.ali@example.com', '01933334444', 'Village Baniachong', 'Sylhet', 'Sylhet', '3100', 'Bangladesh', 15),
(4, 'Mina', 'Akter', 'mina.akter@example.com', '01644445555', 'Farm Road 7', 'Rajshahi', 'Rajshahi', '6000', 'Bangladesh', 6);
