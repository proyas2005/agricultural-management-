// ============================================================
// backend/ai/knowledgeBuilder.js
// Extracts data from MySQL, converts to text chunks,
// generates embeddings via Google Gemini, stores in MongoDB.
// ============================================================

require('dotenv').config();

const mysql = require('mysql2/promise');
const { MongoClient } = require('mongodb');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ---------- Configuration ----------
const MYSQL_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
};

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = 'agriculture_ai';
const MONGODB_COLLECTION = 'knowledge_chunks';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


const EMBEDDING_MODEL = 'gemini-embedding-2';
const EMBEDDING_DIMENSIONS = 3072;


// ============================================================
// Step 1: Extract data from all 13 MySQL tables
// ============================================================
async function extractAllData(connection) {
    const data = {};

    const tables = [
        'farmers',
        'crops',
        'land',
        'planting_records',
        'harvest',
        'markets',
        'sales',
        'weather',
        'equipment',
        'equipment_rental',
        'fertilizers',
        'fertilizer_usage',
        'profit_calculation'
    ];

    for (const table of tables) {
        const [rows] = await connection.query(`SELECT * FROM ${table}`);
        data[table] = rows;
        console.log(`  Loaded ${rows.length} rows from ${table}`);
    }

    return data;
}


// ============================================================
// Step 2: Convert each row into a readable text chunk
// ============================================================
function buildChunks(data) {
    const chunks = [];

    // ---- Farmers ----
    data.farmers.forEach(f => {
        chunks.push({
            source_table: 'farmers',
            source_id: f.farmer_id,
            text:
                `Farmer ID ${f.farmer_id}: ${f.first_name} ${f.last_name}. ` +
                `Email: ${f.email || 'N/A'}. Phone: ${f.phone || 'N/A'}. ` +
                `Address: ${f.address || 'N/A'}, ${f.city || ''} ${f.state || ''} ${f.postal_code || ''}, ${f.country || ''}. ` +
                `Experience: ${f.experience_years || 0} years.`
        });
    });

    // ---- Crops ----
    data.crops.forEach(c => {
        chunks.push({
            source_table: 'crops',
            source_id: c.crop_id,
            text:
                `Crop ID ${c.crop_id}: ${c.crop_name}. Type: ${c.crop_type || 'N/A'}. ` +
                `Planting season: ${c.planting_season || 'N/A'}. Harvest season: ${c.harvest_season || 'N/A'}. ` +
                `Average yield: ${c.avg_yield_per_area || 0} ${c.yield_unit || ''}. ` +
                `Description: ${c.description || 'N/A'}.`
        });
    });

    // ---- Land ----
    data.land.forEach(l => {
        chunks.push({
            source_table: 'land',
            source_id: l.land_id,
            text:
                `Land ID ${l.land_id}: "${l.land_name || 'Unnamed'}". ` +
                `Owned by farmer ID ${l.farmer_id}. ` +
                `Area: ${l.area || 0} ${l.area_unit || ''}. ` +
                `Soil type: ${l.soil_type || 'N/A'}. Location: ${l.location || 'N/A'}.`
        });
    });

    // ---- Planting Records ----
    data.planting_records.forEach(p => {
        chunks.push({
            source_table: 'planting_records',
            source_id: p.planting_id,
            text:
                `Planting record ID ${p.planting_id}: Land ID ${p.land_id} planted with crop ID ${p.crop_id} ` +
                `on ${p.planting_date}. Expected harvest: ${p.expected_harvest_date || 'N/A'}. ` +
                `Quantity planted: ${p.quantity_planted || 0} ${p.quantity_unit || ''}. ` +
                `Fertilizer used: ${p.fertilizer_used || 'N/A'} (${p.fertilizer_amount || 0}). ` +
                `Notes: ${p.notes || 'N/A'}.`
        });
    });

    // ---- Harvest ----
    data.harvest.forEach(h => {
        chunks.push({
            source_table: 'harvest',
            source_id: h.harvest_id,
            text:
                `Harvest ID ${h.harvest_id}: from planting ID ${h.planting_id}. ` +
                `Harvested ${h.quantity_harvested} ${h.quantity_unit} on ${h.harvest_date}. ` +
                `Quality: ${h.quality || 'N/A'}. Storage: ${h.storage_location || 'N/A'}. ` +
                `Notes: ${h.notes || 'N/A'}.`
        });
    });

    // ---- Markets ----
    data.markets.forEach(m => {
        chunks.push({
            source_table: 'markets',
            source_id: m.market_id,
            text:
                `Market ID ${m.market_id}: ${m.market_name}. ` +
                `Location: ${m.location}. Contact: ${m.contact_person || 'N/A'} (${m.phone || 'N/A'}). ` +
                `Email: ${m.email || 'N/A'}. Market type: ${m.market_type || 'N/A'}.`
        });
    });

    // ---- Sales ----
    data.sales.forEach(s => {
        chunks.push({
            source_table: 'sales',
            source_id: s.sale_id,
            text:
                `Sale ID ${s.sale_id}: Harvest ID ${s.harvest_id} sold at Market ID ${s.market_id || 'N/A'} ` +
                `on ${s.sale_date}. Quantity: ${s.quantity_sold} ${s.quantity_unit} at ${s.price_per_unit} per unit. ` +
                `Total amount: ${s.total_sale_amount}. Notes: ${s.notes || 'N/A'}.`
        });
    });

    // ---- Weather ----
    data.weather.forEach(w => {
        chunks.push({
            source_table: 'weather',
            source_id: w.weather_id,
            text:
                `Weather ID ${w.weather_id}: Land ID ${w.land_id} on ${w.weather_date}. ` +
                `Temperature: ${w.temperature_min}°C to ${w.temperature_max}°C. ` +
                `Rainfall: ${w.rainfall} mm. Humidity: ${w.humidity || 'N/A'}%. ` +
                `Wind speed: ${w.wind_speed} m/s. Notes: ${w.notes || 'N/A'}.`
        });
    });

    // ---- Equipment ----
    data.equipment.forEach(e => {
        chunks.push({
            source_table: 'equipment',
            source_id: e.equipment_id,
            text:
                `Equipment ID ${e.equipment_id}: ${e.equipment_name}. ` +
                `Type: ${e.equipment_type}. Owner: ${e.owner_name}. ` +
                `Rental price: ${e.rental_price_per_day} per day. ` +
                `Availability: ${e.availability ? 'Available' : 'Unavailable'}. ` +
                `Description: ${e.description || 'N/A'}.`
        });
    });

    // ---- Equipment Rental ----
    data.equipment_rental.forEach(r => {
        chunks.push({
            source_table: 'equipment_rental',
            source_id: r.rental_id,
            text:
                `Equipment rental ID ${r.rental_id}: Farmer ID ${r.farmer_id} rented equipment ID ${r.equipment_id} ` +
                `from ${r.rental_date} to ${r.return_date || 'N/A'}. ` +
                `Duration: ${r.rental_days} days. Cost: ${r.rental_cost}. ` +
                `Status: ${r.status || 'N/A'}. Notes: ${r.notes || 'N/A'}.`
        });
    });

    // ---- Fertilizers ----
    data.fertilizers.forEach(f => {
        chunks.push({
            source_table: 'fertilizers',
            source_id: f.fertilizer_id,
            text:
                `Fertilizer ID ${f.fertilizer_id}: ${f.fertilizer_name}. ` +
                `Type: ${f.fertilizer_type || 'N/A'}. Unit: ${f.unit}. ` +
                `Price per unit: ${f.price_per_unit}. Description: ${f.description || 'N/A'}.`
        });
    });

    // ---- Fertilizer Usage ----
    data.fertilizer_usage.forEach(u => {
        chunks.push({
            source_table: 'fertilizer_usage',
            source_id: u.usage_id,
            text:
                `Fertilizer usage ID ${u.usage_id}: Fertilizer ID ${u.fertilizer_id} applied to planting ID ${u.planting_id} ` +
                `on ${u.usage_date}. Quantity: ${u.quantity_used} ${u.unit}. Cost: ${u.cost}. ` +
                `Notes: ${u.notes || 'N/A'}.`
        });
    });

    // ---- Profit Calculation ----
    data.profit_calculation.forEach(p => {
        chunks.push({
            source_table: 'profit_calculation',
            source_id: p.profit_id,
            text:
                `Profit record ID ${p.profit_id}: Farmer ID ${p.farmer_id} on ${p.calculation_date}. ` +
                `Total revenue: ${p.total_revenue}. Total cost: ${p.total_cost} ` +
                `(fertilizer: ${p.fertilizer_cost}, equipment rental: ${p.equipment_rental_cost}, other: ${p.other_cost}). ` +
                `Net profit: ${p.net_profit}. Notes: ${p.notes || 'N/A'}.`
        });
    });

    return chunks;
}


// ============================================================
// Step 3: Generate embedding vector for a text chunk via Gemini
// ============================================================
async function generateEmbedding(genAI, text) {
    const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });
    const result = await model.embedContent(text);
    return result.embedding.values;
}


// ============================================================
// Main build process
// ============================================================
async function buildKnowledgeBase() {
    console.log('========================================');
    console.log('  Building AI Knowledge Base');
    console.log('========================================\n');

    console.log('Step 1: Connecting to MySQL...');
    const connection = await mysql.createConnection(MYSQL_CONFIG);
    console.log('  Connected.\n');

    console.log('Step 2: Extracting data from tables...');
    const data = await extractAllData(connection);
    await connection.end();
    console.log('  Extraction complete.\n');

    console.log('Step 3: Building text chunks...');
    const chunks = buildChunks(data);
    console.log(`  Built ${chunks.length} chunks.\n`);

    console.log('Step 4: Generating embeddings via Gemini...');
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    for (let i = 0; i < chunks.length; i++) {
        process.stdout.write(`  Embedding ${i + 1}/${chunks.length}...`);
        try {
            chunks[i].embedding = await generateEmbedding(genAI, chunks[i].text);
            process.stdout.write(' done\n');
        } catch (err) {
            process.stdout.write(` FAILED: ${err.message}\n`);
            chunks[i].embedding = null;
        }
        // Gentle pacing to avoid hitting rate limits
        await new Promise(r => setTimeout(r, 150));
    }
    console.log();

    console.log('Step 5: Storing in MongoDB...');
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB);
    const collection = db.collection(MONGODB_COLLECTION);

    // Clear existing data so re-runs are clean
    await collection.deleteMany({});
    console.log('  Cleared old chunks.');

    const validChunks = chunks.filter(c => c.embedding !== null);
    if (validChunks.length > 0) {
        await collection.insertMany(validChunks);
    }
    console.log(`  Inserted ${validChunks.length} chunks into MongoDB.`);

    await client.close();

    console.log('\n========================================');
    console.log('  Knowledge Base Ready!');
    console.log('========================================');
}

buildKnowledgeBase().catch(err => {
    console.error('\nFATAL ERROR:', err);
    process.exit(1);
});