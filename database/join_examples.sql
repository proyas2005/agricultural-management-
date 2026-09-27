-- INNER JOIN EXAMPLES

-- Example 1: Farmers with their land records
SELECT
    f.farmer_id,
    f.first_name,
    f.last_name,
    l.land_name,
    l.location
FROM farmers f
INNER JOIN land l ON f.farmer_id = l.farmer_id;

-- Example 2: Crops with their planting records
SELECT
    c.crop_name,
    c.crop_type,
    pr.planting_date,
    pr.quantity_planted,
    pr.quantity_unit
FROM crops c
INNER JOIN planting_records pr ON c.crop_id = pr.crop_id;

-- LEFT JOIN EXAMPLES

-- Example 1: All farmers and their land if available
SELECT
    f.farmer_id,
    f.first_name,
    f.last_name,
    l.land_name,
    l.location
FROM farmers f
LEFT JOIN land l ON f.farmer_id = l.farmer_id;

-- Example 2: All markets and their sales if available
SELECT
    m.market_id,
    m.market_name,
    m.location,
    s.sale_id,
    s.sale_date,
    s.total_sale_amount
FROM markets m
LEFT JOIN sales s ON m.market_id = s.market_id;

-- RIGHT JOIN EXAMPLES

-- Example 1: All land records and their farmer details if available
SELECT
    f.farmer_id,
    f.first_name,
    f.last_name,
    l.land_id,
    l.land_name,
    l.location
FROM farmers f
RIGHT JOIN land l ON f.farmer_id = l.farmer_id;

-- Example 2: All planting records and their crop details if available
SELECT
    pr.planting_id,
    pr.planting_date,
    c.crop_name,
    c.crop_type,
    pr.quantity_planted
FROM crops c
RIGHT JOIN planting_records pr ON c.crop_id = pr.crop_id;

-- OUTER JOIN EXAMPLES
-- MySQL does not support FULL OUTER JOIN directly, so this is done with UNION.

-- Example 1: All farmers and all land records, including unmatched rows
SELECT
    f.farmer_id,
    f.first_name,
    l.land_id,
    l.land_name,
    l.location
FROM farmers f
LEFT JOIN land l ON f.farmer_id = l.farmer_id
UNION
SELECT
    f.farmer_id,
    f.first_name,
    l.land_id,
    l.land_name,
    l.location
FROM farmers f
RIGHT JOIN land l ON f.farmer_id = l.farmer_id
WHERE f.farmer_id IS NULL;

-- Example 2: All crops and all harvest records, including unmatched rows
SELECT
    c.crop_id,
    c.crop_name,
    h.harvest_id,
    h.harvest_date,
    h.quantity_harvested
FROM crops c
LEFT JOIN planting_records pr ON c.crop_id = pr.crop_id
LEFT JOIN harvest h ON pr.planting_id = h.planting_id
UNION
SELECT
    c.crop_id,
    c.crop_name,
    h.harvest_id,
    h.harvest_date,
    h.quantity_harvested
FROM crops c
RIGHT JOIN planting_records pr ON c.crop_id = pr.crop_id
RIGHT JOIN harvest h ON pr.planting_id = h.planting_id
WHERE c.crop_id IS NULL;
