-- ============================================================
-- views.sql
-- Views for reporting and profit summary
-- Database: agriculture_db
-- ============================================================

USE agriculture_db;

-- ------------------------------------------------------------
-- View 1: v_farmer_profit_summary
-- One row per farmer showing total revenue, cost, and profit
-- aggregated from the profit_calculation table.
-- ------------------------------------------------------------
DROP VIEW IF EXISTS v_farmer_profit_summary;

CREATE VIEW v_farmer_profit_summary AS
SELECT
    f.farmer_id,
    CONCAT(f.first_name, ' ', f.last_name) AS farmer_name,
    COUNT(pc.profit_id)                    AS total_records,
    IFNULL(SUM(pc.total_revenue), 0)       AS total_revenue,
    IFNULL(SUM(pc.total_cost), 0)          AS total_cost,
    IFNULL(SUM(pc.net_profit), 0)          AS total_net_profit
FROM farmers f
LEFT JOIN profit_calculation pc
       ON f.farmer_id = pc.farmer_id
GROUP BY f.farmer_id, f.first_name, f.last_name;


-- ------------------------------------------------------------
-- View 2: v_equipment_rental_details
-- Shows each rental with farmer name + equipment name.
-- ------------------------------------------------------------
DROP VIEW IF EXISTS v_equipment_rental_details;

CREATE VIEW v_equipment_rental_details AS
SELECT
    er.rental_id,
    CONCAT(f.first_name, ' ', f.last_name) AS farmer_name,
    e.equipment_name,
    e.equipment_type,
    er.rental_date,
    er.return_date,
    er.rental_days,
    er.rental_cost,
    er.status
FROM equipment_rental er
JOIN farmers    f ON er.farmer_id    = f.farmer_id
JOIN equipment  e ON er.equipment_id = e.equipment_id;


-- ------------------------------------------------------------
-- View 3: v_market_sales_summary
-- Total quantity and revenue per market.
-- ------------------------------------------------------------
DROP VIEW IF EXISTS v_market_sales_summary;

CREATE VIEW v_market_sales_summary AS
SELECT
    m.market_id,
    m.market_name,
    m.location,
    COUNT(s.sale_id)                          AS total_sales,
    IFNULL(SUM(s.quantity_sold), 0)           AS total_quantity_sold,
    IFNULL(SUM(s.total_sale_amount), 0)       AS total_revenue
FROM markets m
LEFT JOIN sales s ON m.market_id = s.market_id
GROUP BY m.market_id, m.market_name, m.location;