SELECT
f.farmer_id,
f.first_name,
f.last_name,
l.land_id,
l.land_name,
l.location,
l.area
FROM farmers f
INNER JOIN land l
ON f.farmer_id = l.farmer_id;

SELECT
c.crop_id,
c.crop_name,
c.crop_type,
pr.planting_id,
pr.planting_date,
pr.quantity_planted,
pr.quantity_unit
FROM crops c
INNER JOIN planting_records pr
ON c.crop_id = pr.crop_id;

SELECT
h.harvest_id,
h.harvest_date,
h.quantity_harvested,
h.quality,
c.crop_name,
l.land_name
FROM harvest h
INNER JOIN planting_records pr
ON h.planting_id = pr.planting_id
INNER JOIN crops c
ON pr.crop_id = c.crop_id
INNER JOIN land l
ON pr.land_id = l.land_id;

SELECT
f.farmer_id,
f.first_name,
f.last_name,
l.land_id,
l.land_name,
l.location
FROM farmers f
LEFT JOIN land l
ON f.farmer_id = l.farmer_id;

SELECT
m.market_id,
m.market_name,
m.location,
s.sale_id,
s.sale_date,
s.total_sale_amount
FROM markets m
LEFT JOIN sales s
ON m.market_id = s.market_id;

SELECT
l.land_id,
l.land_name,
l.location,
f.farmer_id,
f.first_name,
f.last_name
FROM farmers f
RIGHT JOIN land l
ON f.farmer_id = l.farmer_id;

SELECT
pr.planting_id,
pr.planting_date,
pr.quantity_planted,
c.crop_id,
c.crop_name,
c.crop_type
FROM crops c
RIGHT JOIN planting_records pr
ON c.crop_id = pr.crop_id;

SELECT
f.farmer_id,
f.first_name,
f.last_name,
l.land_id,
l.land_name,
l.location
FROM farmers f
LEFT JOIN land l
ON f.farmer_id = l.farmer_id

UNION

SELECT
f.farmer_id,
f.first_name,
f.last_name,
l.land_id,
l.land_name,
l.location
FROM farmers f
RIGHT JOIN land l
ON f.farmer_id = l.farmer_id
WHERE f.farmer_id IS NULL;

SELECT
c.crop_id,
c.crop_name,
h.harvest_id,
h.harvest_date,
h.quantity_harvested
FROM crops c
LEFT JOIN planting_records pr
ON c.crop_id = pr.crop_id
LEFT JOIN harvest h
ON pr.planting_id = h.planting_id

UNION

SELECT
c.crop_id,
c.crop_name,
h.harvest_id,
h.harvest_date,
h.quantity_harvested
FROM crops c
RIGHT JOIN planting_records pr
ON c.crop_id = pr.crop_id
RIGHT JOIN harvest h
ON pr.planting_id = h.planting_id
WHERE c.crop_id IS NULL;

SELECT
c.crop_id,
c.crop_name,
COUNT(pr.planting_id) AS total_plantings
FROM crops c
LEFT JOIN planting_records pr
ON c.crop_id = pr.crop_id
GROUP BY
c.crop_id,
c.crop_name
HAVING COUNT(pr.planting_id) > 0;

SELECT
m.market_id,
m.market_name,
COUNT(s.sale_id) AS total_sales,
SUM(s.total_sale_amount) AS total_revenue
FROM markets m
LEFT JOIN sales s
ON m.market_id = s.market_id
GROUP BY
m.market_id,
m.market_name
HAVING SUM(s.total_sale_amount) > 0;

SELECT
f.farmer_id,
f.first_name,
f.last_name,
COUNT(l.land_id) AS total_land_records,
SUM(l.area) AS total_land_area
FROM farmers f
INNER JOIN land l
ON f.farmer_id = l.farmer_id
GROUP BY
f.farmer_id,
f.first_name,
f.last_name
HAVING COUNT(l.land_id) >= 1;

SELECT
farmer_id,
first_name,
last_name
FROM farmers
WHERE farmer_id IN (
SELECT farmer_id
FROM land
WHERE area > 4
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
harvest_date,
quantity_harvested
FROM harvest
WHERE quantity_harvested = (
SELECT MAX(quantity_harvested)
FROM harvest
);

SELECT
crop_id,
crop_name,
crop_type
FROM crops
WHERE crop_id IN (
SELECT DISTINCT pr.crop_id
FROM planting_records pr
WHERE pr.land_id IN (
SELECT land_id
FROM land
WHERE farmer_id = 1
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
WHERE area > 4
);

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
