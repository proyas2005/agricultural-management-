-- AGGREGATE FUNCTION EXAMPLES


-- 1. Count total farmers
SELECT COUNT(*) AS total_farmers
FROM farmers;


-- 2. Count total land records
SELECT COUNT(*) AS total_land_records
FROM land;


-- 3. Sum total sale amount
SELECT SUM(total_sale_amount) AS total_sales_value
FROM sales;


-- 4. Average harvested quantity
SELECT AVG(quantity_harvested) AS average_harvest_quantity
FROM harvest;


-- 5. Maximum sale amount
SELECT MAX(total_sale_amount) AS highest_sale_amount
FROM sales;


-- 6. Minimum rainfall value
SELECT MIN(rainfall) AS minimum_rainfall
FROM weather;


-- 7. Group by crop to count plantings
SELECT
    c.crop_name,
    COUNT(pr.planting_id) AS no_of_plantings,
    SUM(pr.quantity_planted) AS total_quantity_planted
FROM crops c
LEFT JOIN planting_records pr
    ON c.crop_id = pr.crop_id
GROUP BY c.crop_id, c.crop_name;


-- 8. Group by market to calculate average sales
SELECT
    m.market_name,
    COUNT(s.sale_id) AS total_sales,
    AVG(s.total_sale_amount) AS average_sale_amount
FROM markets m
LEFT JOIN sales s
    ON m.market_id = s.market_id
GROUP BY m.market_id, m.market_name;


-- 9. Group by farmer and sum land area
SELECT
    f.first_name,
    f.last_name,
    SUM(l.area) AS total_land_area
FROM farmers f
JOIN land l
    ON f.farmer_id = l.farmer_id
GROUP BY f.farmer_id, f.first_name, f.last_name;


-- 10. Calculate average yield by crop type
SELECT
    crop_type,
    COUNT(crop_id) AS total_crops,
    AVG(avg_yield_per_area) AS average_yield
FROM crops
GROUP BY crop_type;


-- 11. Find crop types with more than one crop
SELECT
    crop_type,
    COUNT(crop_id) AS crop_count
FROM crops
GROUP BY crop_type
HAVING COUNT(crop_id) > 1;