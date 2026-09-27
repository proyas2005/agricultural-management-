-- ============================================================
-- triggers.sql
-- Database triggers for automatic actions
-- Database: agriculture_db
-- ============================================================

USE agriculture_db;

-- ------------------------------------------------------------
-- Trigger 1: after_sale_insert
-- Purpose: When a sale is created, automatically mark the
-- related harvest's quality as 'Sold' so the farmer can see
-- that this harvest has already been sold.
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS after_sale_insert;

DELIMITER $$

CREATE TRIGGER after_sale_insert
AFTER INSERT ON sales
FOR EACH ROW
BEGIN
    -- Append a marker to the harvest's quality column so we know
    -- this harvest has been sold at least once.
    UPDATE harvest
       SET quality = CONCAT(
                       IFNULL(quality, ''),
                       ' [Sold via Sale #',
                       NEW.sale_id,
                       ']'
                     )
     WHERE harvest_id = NEW.harvest_id;
END$$

DELIMITER ;


-- ------------------------------------------------------------
-- Trigger 2: before_equipment_rental_insert
-- Purpose: Automatically compute rental_cost if it was sent
-- as 0, based on the equipment's daily rate × rental_days.
-- Ensures the farmer is charged the correct amount.
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS before_equipment_rental_insert;

DELIMITER $$

CREATE TRIGGER before_equipment_rental_insert
BEFORE INSERT ON equipment_rental
FOR EACH ROW
BEGIN
    DECLARE daily_rate DECIMAL(10,2);

    -- Only auto-fill if cost was left as 0
    IF NEW.rental_cost = 0 THEN
        SELECT rental_price_per_day
          INTO daily_rate
          FROM equipment
         WHERE equipment_id = NEW.equipment_id;

        SET NEW.rental_cost = daily_rate * NEW.rental_days;
    END IF;
END$$

DELIMITER ;