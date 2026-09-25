require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const farmersRoutes = require('./backend/routes/farmers');
const cropsRoutes = require('./backend/routes/crops');
const landRoutes = require('./backend/routes/land');
const equipmentRoutes = require('./backend/routes/equipment');
const equipmentRentalRoutes = require('./backend/routes/equipmentRental');
const marketsRoutes = require('./backend/routes/markets');
const plantingRecordsRoutes = require('./backend/routes/plantingRecords');
const harvestRoutes = require('./backend/routes/harvest');
const salesRoutes = require('./backend/routes/sales');
const weatherRoutes = require('./backend/routes/weather');
const profitCalculationRoutes = require('./backend/routes/profitCalculation');
const fertilizersRoutes = require('./backend/routes/fertilizers');
const fertilizerUsageRoutes = require('./backend/routes/fertilizerUsage');
const reportsRoutes = require('./backend/routes/reports');





const app = express();

// Error log file (used for debugging)
const fs = require('fs');
const originalConsoleError = console.error;
console.error = function(...args) {
    originalConsoleError.apply(console, args);
    try {
        const line = args.map(a =>
            typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
        ).join(' ');
        fs.appendFileSync('server-errors.txt', new Date().toISOString() + ' | ' + line + '\n\n');
    } catch (e) {}
};


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('frontend'));

app.use(farmersRoutes);
app.use(cropsRoutes);
app.use(landRoutes);
app.use(equipmentRoutes);
app.use(equipmentRentalRoutes);
app.use(marketsRoutes);
app.use(plantingRecordsRoutes);
app.use(harvestRoutes);
app.use(salesRoutes);
app.use(weatherRoutes);
app.use(profitCalculationRoutes);
app.use(fertilizersRoutes);
app.use(fertilizerUsageRoutes);
app.use(reportsRoutes);






const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Agriculture Management System API running on http://localhost:${PORT}`);
    console.log('Frontend available at http://localhost:' + PORT);
});