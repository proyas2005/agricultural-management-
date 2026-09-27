-- ============================================================
-- transactions.sql
-- Demonstration of transactions (atomic multi-table operations)
-- Database: agriculture_db
-- ============================================================

USE agriculture_db;

-- ------------------------------------------------------------
-- TRANSACTION 1: Create a new equipment rental
-- Purpose: Insert a rental AND mark the equipment as unavailable
-- in a single atomic unit. If either step fails, both are rolled
-- back so the database stays consistent.
--
-- Example scenario:
--   Farmer 5 rents Equipment 3 for 4 days starting 2026-10-01.
-- ------------------------------------------------------------

START TRANSACTION;

    -- Step 1: Insert the rental record
    INSERT INTO equipment_rental (
        farmer_id,
        equipment_id,
        rental_date,
        return_date,
        rental_days,
        rental_cost,
        status,
        notes
    ) VALUES (
        5,                   -- farmer_id (Karim Hasan)
        3,                   -- equipment_id (Power Tiller)
        '2026-10-01',        -- rental_date
        '2026-10-05',        -- return_date
        4,                   -- rental_days
        0,                   -- rental_cost (0 → trigger will compute it)
        'Active',
        'Rented by Karim for the paddy season'
    );

    -- Step 2: Mark equipment as unavailable
    UPDATE equipment
       SET availability = 0
     WHERE equipment_id = 3;

-- Uncomment the line below to test rollback instead of commit
-- ROLLBACK;

COMMIT;

-- Verification: see the inserted rental and updated equipment
SELECT * FROM equipment_rental ORDER BY rental_id DESC LIMIT 1;
SELECT * FROM equipment WHERE equipment_id = 3;


-- ------------------------------------------------------------
-- TRANSACTION 2 (commented template):
-- Record a sale AND update the harvest quality in one atomic step.
-- Shows how a transaction would be used in the real application.
-- ------------------------------------------------------------
/*
START TRANSACTION;

    INSERT INTO sales (
        harvest_id,
        market_id,
        sale_date,
        quantity_sold,
        quantity_unit,
        price_per_unit,
        total_sale_amount,
        notes
    ) VALUES (
        1,
        1,
        '2026-10-15',
        100,
        'kg',
        45.00,
        4500.00,
        'Rice sale at local market'
    );

    -- Optional: manually update harvest quality
    UPDATE harvest
       SET quality = 'Grade A - Sold'
     WHERE harvest_id = 1;

COMMIT;
*/