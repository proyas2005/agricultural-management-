-- Agriculture Management System database setup

CREATE DATABASE IF NOT EXISTS agriculture_db;
USE agriculture_db;

-- Table creation scripts (run in order — each depends on prior tables)
SOURCE tables/01_farmers.sql;
SOURCE tables/02_land.sql;
SOURCE tables/03_crops.sql;
SOURCE tables/04_planting_records.sql;
SOURCE tables/05_harvest.sql;
SOURCE tables/06_markets.sql;
SOURCE tables/07_sales.sql;
SOURCE tables/08_weather.sql;
SOURCE tables/09_equipment.sql;
SOURCE tables/10_equipment_rental.sql;
SOURCE tables/11_fertilizers.sql;
SOURCE tables/12_fertilizer_usage.sql;
SOURCE tables/13_profit_calculation.sql;

-- Sample data (optional demo data)
SOURCE sample_data.sql;

-- Advanced DB objects
SOURCE views.sql;
SOURCE triggers.sql;
SOURCE procedures.sql;
-- transactions.sql is a demonstration script, not run at setup time