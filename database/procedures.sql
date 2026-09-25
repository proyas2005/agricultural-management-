-- ============================================================
-- procedures.sql
-- Stored procedures for complex business logic
-- Database: agriculture_db
-- ============================================================

USE agriculture_db;

-- ------------------------------------------------------------
-- Procedure 1: calculate_farmer_profit
-- Input:  p_farmer_id (INT)
-- Output: total revenue, total cost, and net profit for a farmer
-- ------------------------------------------------------------
DROP PROCEDURE IF EXISTS calculate_farmer_profit;

DELIMITER $$

CREATE PROCEDURE calculate_farmer_profit(IN p_farmer_id INT)
BEGIN
    SELECT
        f.farmer_id,
        CONCAT(f.first_name, ' ', f.last_name) AS farmer_name,
        IFNULL(SUM(pc.total_revenue), 0)       AS total_revenue,
        IFNULL(SUM(pc.total_cost), 0)          AS total_cost,
        IFNULL(SUM(pc.net_profit), 0)          AS total_net_profit
    FROM farmers f
    LEFT JOIN profit_calculation pc
           ON f.farmer_id = pc.farmer_id
    WHERE f.farmer_id = p_farmer_id
    GROUP BY f.farmer_id, f.first_name, f.last_name;
END$$

DELIMITER ;


-- ------------------------------------------------------------
-- Procedure 2: get_top_farmers_by_profit
-- Input:  p_limit (INT) — how many farmers to return
-- Output: top N farmers ordered by net profit
-- ------------------------------------------------------------
DROP PROCEDURE IF EXISTS get_top_farmers_by_profit;

DELIMITER $$

CREATE PROCEDURE get_top_farmers_by_profit(IN p_limit INT)
BEGIN
    SELECT
        f.farmer_id,
        CONCAT(f.first_name, ' ', f.last_name) AS farmer_name,
        IFNULL(SUM(pc.net_profit), 0)          AS total_net_profit
    FROM farmers f
    LEFT JOIN profit_calculation pc
           ON f.farmer_id = pc.farmer_id
    GROUP BY f.farmer_id, f.first_name, f.last_name
    ORDER BY total_net_profit DESC
    LIMIT p_limit;
END$$

DELIMITER ;