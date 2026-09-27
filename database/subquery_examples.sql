SELECT
    farmer_id,
    first_name,
    last_name
FROM farmers
WHERE farmer_id IN (
    SELECT farmer_id
    FROM land
    WHERE location LIKE '%Dhaka%'
);

SELECT
    land_id,
    land_name,
    area,
    farmer_id
FROM land
WHERE farmer_id = (
    SELECT farmer_id
    FROM farmers
    ORDER BY experience_years DESC
    LIMIT 1
);

SELECT
    crop_id,
    crop_name
FROM crops
WHERE crop_id IN (
    SELECT DISTINCT crop_id
    FROM planting_records
    WHERE land_id IN (
        SELECT land_id
        FROM land
        WHERE farmer_id = 1
    )
);

SELECT
    sale_id,
    market_id,
    sale_date,
    total_sale_amount
FROM sales
WHERE total_sale_amount > (
    SELECT AVG(total_sale_amount)
    FROM sales
);

SELECT
    harvest_id,
    planting_id,
    quantity_harvested
FROM harvest
WHERE quantity_harvested >= (
    SELECT MAX(quantity_harvested)
    FROM harvest
);

SELECT
    market_id,
    market_name,
    location
FROM markets
WHERE market_id IN (
    SELECT DISTINCT market_id
    FROM sales
    WHERE total_sale_amount > (
        SELECT AVG(total_sale_amount)
        FROM sales
    )
);

SELECT
    weather_id,
    land_id,
    weather_date,
    rainfall
FROM weather
WHERE land_id IN (
    SELECT land_id
    FROM land
    WHERE area >= 4
);