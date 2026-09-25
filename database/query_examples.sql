-- ================================
-- JOIN TABLE EXAMPLES
-- ================================

-- 1) Join farmers, land, and crops through planting records
SELECT
    f.first_name,
    f.last_name,
    l.land_name,
    c.crop_name,
    pr.planting_date,
    pr.quantity_planted,
    pr.quantity_unit
FROM planting_records pr
JOIN land l ON pr.land_id = l.land_id
JOIN farmers f ON l.farmer_id = f.farmer_id
JOIN crops c ON pr.crop_id = c.crop_id
ORDER BY pr.planting_date DESC;

-- 2) Join harvest with planting, land, and crop information
SELECT
    h.harvest_id,
    c.crop_name,
    l.land_name,
    h.harvest_date,
    h.quantity_harvested,
    h.quality
FROM harvest h
JOIN planting_records pr ON h.planting_id = pr.planting_id
JOIN land l ON pr.land_id = l.land_id
JOIN crops c ON pr.crop_id = c.crop_id
ORDER BY h.harvest_date DESC;

-- 3) Join sales with market and harvest details
SELECT
    s.sale_id,
    m.market_name,
    c.crop_name,
    s.sale_date,
    s.quantity_sold,
    s.price_per_unit,
    s.total_sale_amount
FROM sales s
LEFT JOIN markets m ON s.market_id = m.market_id
JOIN harvest h ON s.harvest_id = h.harvest_id
JOIN planting_records pr ON h.planting_id = pr.planting_id
JOIN crops c ON pr.crop_id = c.crop_id
ORDER BY s.sale_date DESC;

-- ================================
-- SUBQUERY EXAMPLES
-- ================================

-- 1) Find all land owned by farmers from Dhaka
SELECT
    land_id,
    land_name,
    area,
    location
FROM land
WHERE farmer_id IN (
    SELECT farmer_id
    FROM farmers
    WHERE city = 'Dhaka'
);

-- 2) Find crops that have been planted on land owned by farmer id = 1
SELECT
    crop_id,
    crop_name,
    crop_type
FROM crops
WHERE crop_id IN (
    SELECT DISTINCT pr.crop_id
    FROM planting_records pr
    JOIN land l ON pr.land_id = l.land_id
    WHERE l.farmer_id = 1
);

-- 3) Show the latest harvest for each planting record using subquery
SELECT
    h.harvest_id,
    h.planting_id,
    h.harvest_date,
    h.quantity_harvested
FROM harvest h
WHERE h.harvest_date = (
    SELECT MAX(h2.harvest_date)
    FROM harvest h2
    WHERE h2.planting_id = h.planting_id
);

-- 4) Find markets with sales above average sale value
SELECT
    market_id,
    market_name,
    location
FROM markets
WHERE market_id IN (
    SELECT market_id
    FROM sales
    WHERE total_sale_amount > (
        SELECT AVG(total_sale_amount)
        FROM sales
    )
);
