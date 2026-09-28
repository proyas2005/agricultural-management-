// API Base URL
const API_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port || '3002'}/api`;

const DEMO_DATA = {
    farmers: [
        { farmer_id: 1, first_name: 'Rahim', last_name: 'Uddin', email: 'rahim.uddin@example.com', phone: '01711111222', address: 'Village A', city: 'Dhaka', state: 'Dhaka', postal_code: '1200', country: 'Bangladesh', experience_years: 12 },
        { farmer_id: 2, first_name: 'Nusrat', last_name: 'Jahan', email: 'nusrat.jahan@example.com', phone: '01822222333', address: 'Village B', city: 'Chittagong', state: 'Chittagong', postal_code: '4000', country: 'Bangladesh', experience_years: 8 },
        { farmer_id: 3, first_name: 'Sajed', last_name: 'Ali', email: 'sajed.ali@example.com', phone: '01933333444', address: 'Village C', city: 'Sylhet', state: 'Sylhet', postal_code: '3100', country: 'Bangladesh', experience_years: 15 },
        { farmer_id: 4, first_name: 'Mina', last_name: 'Akter', email: 'mina.akter@example.com', phone: '01644444555', address: 'Village D', city: 'Rajshahi', state: 'Rajshahi', postal_code: '6000', country: 'Bangladesh', experience_years: 6 },
        { farmer_id: 5, first_name: 'Karim', last_name: 'Hasan', email: 'karim.hasan@example.com', phone: '01818888444', address: 'Village E', city: 'Gazipur', state: 'Dhaka', postal_code: '1700', country: 'Bangladesh', experience_years: 2 }
    ],
    crops: [
        { crop_id: 1, crop_name: 'Rice', crop_type: 'Cereal', description: 'Main staple crop', planting_season: 'June-July', harvest_season: 'November-December', avg_yield_per_area: 4000, yield_unit: 'kg/hectare' },
        { crop_id: 2, crop_name: 'Wheat', crop_type: 'Cereal', description: 'Winter crop', planting_season: 'November', harvest_season: 'March-April', avg_yield_per_area: 3000, yield_unit: 'kg/hectare' },
        { crop_id: 3, crop_name: 'Jute', crop_type: 'Fiber', description: 'Cash crop', planting_season: 'March-April', harvest_season: 'July-August', avg_yield_per_area: 2500, yield_unit: 'kg/hectare' },
        { crop_id: 4, crop_name: 'Potato', crop_type: 'Vegetable', description: 'Vegetable crop', planting_season: 'November', harvest_season: 'February-March', avg_yield_per_area: 12000, yield_unit: 'kg/hectare' },
        { crop_id: 5, crop_name: 'Sugarcane', crop_type: 'Cash Crop', description: 'Long-duration crop', planting_season: 'October', harvest_season: 'November-December', avg_yield_per_area: 70000, yield_unit: 'kg/hectare' }
    ],
    land: [
        { land_id: 1, farmer_id: 1, first_name: 'Rahim', last_name: 'Uddin', land_name: 'Rahim Rice Field', area: 2.5, area_unit: 'acre', soil_type: 'Loamy', location: 'Village A' },
        { land_id: 2, farmer_id: 2, first_name: 'Nusrat', last_name: 'Jahan', land_name: 'Nusrat Jute Plot', area: 1.2, area_unit: 'acre', soil_type: 'Clay', location: 'Village B' },
        { land_id: 3, farmer_id: 3, first_name: 'Sajed', last_name: 'Ali', land_name: 'Sajed Sugarcane Farm', area: 4.0, area_unit: 'acre', soil_type: 'Alluvial', location: 'Village C' },
        { land_id: 4, farmer_id: 4, first_name: 'Mina', last_name: 'Akter', land_name: 'Mina Potato Plot', area: 0.8, area_unit: 'acre', soil_type: 'Sandy', location: 'Village D' },
        { land_id: 5, farmer_id: 5, first_name: 'Karim', last_name: 'Hasan', land_name: 'Karim Wheat Field', area: 1.5, area_unit: 'acre', soil_type: 'Loamy', location: 'Village E' }
    ],
    markets: [
        { market_id: 1, market_name: 'Dhaka Wholesale Market', location: 'Dhaka', contact_person: 'Mr. Kamal', phone: '01700000001', email: 'dhaka@markets.example.com', market_type: 'Wholesale' },
        { market_id: 2, market_name: 'Chittagong Bazaar', location: 'Chittagong', contact_person: 'Mr. Rafiq', phone: '01700000002', email: 'ctg@markets.example.com', market_type: 'Retail' },
        { market_id: 3, market_name: 'Sylhet Local Market', location: 'Sylhet', contact_person: 'Mr. Salam', phone: '01700000003', email: 'sylhet@markets.example.com', market_type: 'Local' },
        { market_id: 4, market_name: 'Rajshahi Grain Market', location: 'Rajshahi', contact_person: 'Mrs. Amina', phone: '01700000004', email: 'rajshahi@markets.example.com', market_type: 'Grain' }
    ],
    equipment: [
        { equipment_id: 1, equipment_name: 'Kubota Tractor', equipment_type: 'Tractor', owner_name: 'Green Field Services', rental_price_per_day: 3500, description: 'Compact tractor', availability: 1 },
        { equipment_id: 2, equipment_name: 'Rice Transplanter', equipment_type: 'Planter', owner_name: 'Agri Tools Bangladesh', rental_price_per_day: 2200, description: 'Rice planting machine', availability: 1 },
        { equipment_id: 3, equipment_name: 'Power Tiller', equipment_type: 'Tiller', owner_name: 'Modern Agro Services', rental_price_per_day: 1800, description: 'Compact soil tiller', availability: 1 },
        { equipment_id: 4, equipment_name: 'Water Pump', equipment_type: 'Irrigation', owner_name: 'Farm Equipment Center', rental_price_per_day: 1200, description: 'Diesel water pump', availability: 1 },
        { equipment_id: 5, equipment_name: 'John Deere 5050D', equipment_type: 'Tractor', owner_name: 'Rahim Uddin', rental_price_per_day: 3500, description: 'Heavy-duty tractor', availability: 1 }
    ],
    equipmentRentals: [
        { rental_id: 1, farmer_id: 1, farmer_name: 'Rahim Uddin', equipment_id: 1, equipment_name: 'Kubota Tractor', rental_date: '2026-06-20', return_date: '2026-06-23', rental_days: 3, rental_cost: 10500, status: 'Completed', notes: 'Tractor for land prep' },
        { rental_id: 2, farmer_id: 2, farmer_name: 'Nusrat Jahan', equipment_id: 2, equipment_name: 'Rice Transplanter', rental_date: '2026-04-10', return_date: '2026-04-12', rental_days: 2, rental_cost: 4400, status: 'Completed', notes: 'Rice transplanter' },
        { rental_id: 3, farmer_id: 3, farmer_name: 'Sajed Ali', equipment_id: 3, equipment_name: 'Power Tiller', rental_date: '2026-10-08', return_date: '2026-10-12', rental_days: 4, rental_cost: 7200, status: 'Completed', notes: 'Power tiller' },
        { rental_id: 4, farmer_id: 4, farmer_name: 'Mina Akter', equipment_id: 4, equipment_name: 'Water Pump', rental_date: '2026-11-15', return_date: '2026-11-18', rental_days: 3, rental_cost: 3600, status: 'Completed', notes: 'Water pump for irrigation' },
        { rental_id: 5, farmer_id: 5, farmer_name: 'Karim Hasan', equipment_id: 1, equipment_name: 'Kubota Tractor', rental_date: '2026-11-20', return_date: '2026-11-23', rental_days: 3, rental_cost: 10500, status: 'Active', notes: 'Tractor for wheat field' }
    ],
    fertilizers: [
        { fertilizer_id: 1, fertilizer_name: 'Urea', fertilizer_type: 'Nitrogen', unit: 'kg', price_per_unit: 27, description: 'High-nitrogen fertilizer' },
        { fertilizer_id: 2, fertilizer_name: 'TSP', fertilizer_type: 'Phosphate', unit: 'kg', price_per_unit: 30, description: 'Phosphorus source' },
        { fertilizer_id: 3, fertilizer_name: 'Potash', fertilizer_type: 'Potassium', unit: 'kg', price_per_unit: 25, description: 'Potassium source' },
        { fertilizer_id: 4, fertilizer_name: 'Compost', fertilizer_type: 'Organic', unit: 'kg', price_per_unit: 10, description: 'Organic compost' },
        { fertilizer_id: 5, fertilizer_name: 'DAP', fertilizer_type: 'Compound', unit: 'kg', price_per_unit: 35, description: 'Compound fertilizer' }
    ],
    plantingRecords: [
        { planting_id: 1, land_id: 1, crop_id: 1, land_name: 'Rahim Rice Field', crop_name: 'Rice', planting_date: '2026-06-15', expected_harvest_date: '2026-11-20', quantity_planted: 50, quantity_unit: 'kg', fertilizer_used: 'Urea', fertilizer_amount: 25, notes: 'Rice season 1' },
        { planting_id: 2, land_id: 2, crop_id: 3, land_name: 'Nusrat Jute Plot', crop_name: 'Jute', planting_date: '2026-04-01', expected_harvest_date: '2026-07-25', quantity_planted: 30, quantity_unit: 'kg', fertilizer_used: 'Compost', fertilizer_amount: 40, notes: 'Jute season' },
        { planting_id: 3, land_id: 3, crop_id: 5, land_name: 'Sajed Sugarcane Farm', crop_name: 'Sugarcane', planting_date: '2026-10-05', expected_harvest_date: '2026-12-15', quantity_planted: 200, quantity_unit: 'kg', fertilizer_used: 'Urea', fertilizer_amount: 60, notes: 'Sugarcane plantation' },
        { planting_id: 4, land_id: 4, crop_id: 4, land_name: 'Mina Potato Plot', crop_name: 'Potato', planting_date: '2026-11-10', expected_harvest_date: '2027-02-28', quantity_planted: 150, quantity_unit: 'kg', fertilizer_used: 'Potash', fertilizer_amount: 35, notes: 'Potato season' },
        { planting_id: 5, land_id: 5, crop_id: 2, land_name: 'Karim Wheat Field', crop_name: 'Wheat', planting_date: '2026-11-15', expected_harvest_date: '2027-03-30', quantity_planted: 40, quantity_unit: 'kg', fertilizer_used: 'Urea', fertilizer_amount: 20, notes: 'Wheat season' }
    ],
    harvests: [
        { harvest_id: 1, planting_id: 1, crop_name: 'Rice', land_name: 'Rahim Rice Field', harvest_date: '2026-11-22', quantity_harvested: 9000, quantity_unit: 'kg', quality: 'Premium', storage_location: 'Rahim Warehouse', notes: 'Rice harvest' },
        { harvest_id: 2, planting_id: 2, crop_name: 'Jute', land_name: 'Nusrat Jute Plot', harvest_date: '2026-07-28', quantity_harvested: 4500, quantity_unit: 'kg', quality: 'Grade A', storage_location: 'Nusrat Warehouse', notes: 'Jute harvest' },
        { harvest_id: 3, planting_id: 3, crop_name: 'Sugarcane', land_name: 'Sajed Sugarcane Farm', harvest_date: '2026-12-18', quantity_harvested: 45000, quantity_unit: 'kg', quality: 'Grade A', storage_location: 'Sajed Warehouse', notes: 'Sugarcane harvest' },
        { harvest_id: 4, planting_id: 4, crop_name: 'Potato', land_name: 'Mina Potato Plot', harvest_date: '2027-03-02', quantity_harvested: 8500, quantity_unit: 'kg', quality: 'Premium', storage_location: 'Mina Storage', notes: 'Potato harvest' },
        { harvest_id: 5, planting_id: 5, crop_name: 'Wheat', land_name: 'Karim Wheat Field', harvest_date: '2027-04-02', quantity_harvested: 3800, quantity_unit: 'kg', quality: 'Grade B', storage_location: 'Karim Storage', notes: 'Wheat harvest' }
    ],
    sales: [
        { sale_id: 1, harvest_id: 1, crop_name: 'Rice', market_name: 'Dhaka Wholesale Market', sale_date: '2026-11-25', quantity_sold: 8000, quantity_unit: 'kg', price_per_unit: 26, total_sale_amount: 208000, notes: 'Rice sale' },
        { sale_id: 2, harvest_id: 2, crop_name: 'Jute', market_name: 'Chittagong Bazaar', sale_date: '2026-08-01', quantity_sold: 4200, quantity_unit: 'kg', price_per_unit: 42, total_sale_amount: 176400, notes: 'Jute sale' },
        { sale_id: 3, harvest_id: 3, crop_name: 'Sugarcane', market_name: 'Sylhet Local Market', sale_date: '2026-12-22', quantity_sold: 40000, quantity_unit: 'kg', price_per_unit: 3.5, total_sale_amount: 140000, notes: 'Sugarcane sale' },
        { sale_id: 4, harvest_id: 4, crop_name: 'Potato', market_name: 'Rajshahi Grain Market', sale_date: '2027-03-05', quantity_sold: 8000, quantity_unit: 'kg', price_per_unit: 30, total_sale_amount: 240000, notes: 'Potato sale' },
        { sale_id: 5, harvest_id: 5, crop_name: 'Wheat', market_name: 'Dhaka Wholesale Market', sale_date: '2027-04-05', quantity_sold: 3500, quantity_unit: 'kg', price_per_unit: 34, total_sale_amount: 119000, notes: 'Wheat sale' }
    ],
    weather: [
        { weather_id: 1, land_id: 1, land_name: 'Rahim Rice Field', weather_date: '2026-07-10', temperature_min: 26.5, temperature_max: 33, rainfall: 12.5, humidity: 78, wind_speed: 8.2, notes: 'Monsoon rain' },
        { weather_id: 2, land_id: 2, land_name: 'Nusrat Jute Plot', weather_date: '2026-05-20', temperature_min: 24, temperature_max: 35.5, rainfall: 5, humidity: 65, wind_speed: 6.1, notes: 'Warm day' },
        { weather_id: 3, land_id: 3, land_name: 'Sajed Sugarcane Farm', weather_date: '2026-10-15', temperature_min: 22, temperature_max: 31.5, rainfall: 0, humidity: 55, wind_speed: 4, notes: 'Dry clear day' },
        { weather_id: 4, land_id: 4, land_name: 'Mina Potato Plot', weather_date: '2026-11-25', temperature_min: 15, temperature_max: 27, rainfall: 0, humidity: 60, wind_speed: 3.5, notes: 'Cool and dry' },
        { weather_id: 5, land_id: 5, land_name: 'Karim Wheat Field', weather_date: '2026-12-05', temperature_min: 12.5, temperature_max: 25, rainfall: 0, humidity: 68, wind_speed: 5.2, notes: 'Winter morning' }
    ],
    fertilizerUsages: [
        { usage_id: 1, planting_id: 1, fertilizer_id: 1, farmer_name: 'Rahim Uddin', crop_name: 'Rice', land_name: 'Rahim Rice Field', fertilizer_name: 'Urea', usage_date: '2026-07-01', quantity_used: 30, unit: 'kg', cost: 810, notes: 'Urea for rice' },
        { usage_id: 2, planting_id: 1, fertilizer_id: 4, farmer_name: 'Rahim Uddin', crop_name: 'Rice', land_name: 'Rahim Rice Field', fertilizer_name: 'Compost', usage_date: '2026-07-15', quantity_used: 20, unit: 'kg', cost: 200, notes: 'Compost for rice' },
        { usage_id: 3, planting_id: 2, fertilizer_id: 2, farmer_name: 'Nusrat Jahan', crop_name: 'Jute', land_name: 'Nusrat Jute Plot', fertilizer_name: 'TSP', usage_date: '2026-04-15', quantity_used: 15, unit: 'kg', cost: 450, notes: 'TSP for jute' },
        { usage_id: 4, planting_id: 3, fertilizer_id: 1, farmer_name: 'Sajed Ali', crop_name: 'Sugarcane', land_name: 'Sajed Sugarcane Farm', fertilizer_name: 'Urea', usage_date: '2026-10-20', quantity_used: 50, unit: 'kg', cost: 1350, notes: 'Urea for sugarcane' },
        { usage_id: 5, planting_id: 4, fertilizer_id: 3, farmer_name: 'Mina Akter', crop_name: 'Potato', land_name: 'Mina Potato Plot', fertilizer_name: 'Potash', usage_date: '2026-11-20', quantity_used: 40, unit: 'kg', cost: 1000, notes: 'Potash for potato' },
        { usage_id: 6, planting_id: 5, fertilizer_id: 5, farmer_name: 'Karim Hasan', crop_name: 'Wheat', land_name: 'Karim Wheat Field', fertilizer_name: 'DAP', usage_date: '2026-11-25', quantity_used: 25, unit: 'kg', cost: 875, notes: 'DAP for wheat' }
    ],
    profitCalculations: [
        { profit_id: 1, farmer_id: 1, farmer_name: 'Rahim Uddin', calculation_date: '2026-11-30', total_revenue: 208000, fertilizer_cost: 1010, equipment_rental_cost: 10500, other_cost: 1000, total_cost: 12510, net_profit: 195490, notes: 'Rice season profit' },
        { profit_id: 2, farmer_id: 2, farmer_name: 'Nusrat Jahan', calculation_date: '2026-08-10', total_revenue: 176400, fertilizer_cost: 450, equipment_rental_cost: 4400, other_cost: 800, total_cost: 5650, net_profit: 170750, notes: 'Jute season profit' },
        { profit_id: 3, farmer_id: 3, farmer_name: 'Sajed Ali', calculation_date: '2026-12-30', total_revenue: 140000, fertilizer_cost: 1350, equipment_rental_cost: 7200, other_cost: 700, total_cost: 9250, net_profit: 130750, notes: 'Sugarcane profit' },
        { profit_id: 4, farmer_id: 4, farmer_name: 'Mina Akter', calculation_date: '2027-03-10', total_revenue: 240000, fertilizer_cost: 1000, equipment_rental_cost: 3600, other_cost: 900, total_cost: 5500, net_profit: 234500, notes: 'Potato profit' },
        { profit_id: 5, farmer_id: 5, farmer_name: 'Karim Hasan', calculation_date: '2027-04-10', total_revenue: 119000, fertilizer_cost: 875, equipment_rental_cost: 10500, other_cost: 600, total_cost: 11975, net_profit: 107025, notes: 'Wheat profit' }
    ]
};

function demoJsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}

function demoGetCollection(key) {
    return DEMO_DATA[key] || [];
}

function demoNextId(list, fieldName) {
    return list.reduce((max, item) => Math.max(max, Number(item[fieldName]) || 0), 0) + 1;
}

function demoMatchRoute(url) {
    const cleanUrl = url.replace(API_URL, '').replace(/^\/api/, '');
    if (!cleanUrl || !cleanUrl.startsWith('/')) return null;

    const route = cleanUrl.split('?')[0];
    if (route === '/reports/farmer-profit-summary') {
        return {
            collection: 'reports',
            section: 'farmer-profit-summary'
        };
    }
    if (route === '/reports/equipment-rental-details') {
        return {
            collection: 'reports',
            section: 'equipment-rental-details'
        };
    }
    if (route === '/reports/market-sales-summary') {
        return {
            collection: 'reports',
            section: 'market-sales-summary'
        };
    }

    const parts = route.split('/').filter(Boolean);
    if (parts.length === 1) {
        return { collection: parts[0] };
    }
    if (parts.length === 2) {
        return { collection: parts[0], id: Number(parts[1]) };
    }

    return null;
}

function handleDemoRequest(url, init = {}) {
    const routeInfo = demoMatchRoute(url);
    if (!routeInfo) return null;

    const method = (init.method || 'GET').toUpperCase();
    const body = init.body ? JSON.parse(init.body) : null;
    const { collection, id, section } = routeInfo;

    if (section) {
        if (method === 'GET') {
            if (section === 'farmer-profit-summary') {
                return demoJsonResponse(DEMO_DATA.profitCalculations.map(item => ({
                    farmer_id: item.farmer_id,
                    farmer_name: item.farmer_name,
                    total_records: 1,
                    total_revenue: item.total_revenue,
                    total_cost: item.total_cost,
                    total_net_profit: item.net_profit
                })));
            }
            if (section === 'equipment-rental-details') {
                return demoJsonResponse(DEMO_DATA.equipmentRentals.map(item => ({
                    rental_id: item.rental_id,
                    farmer_name: item.farmer_name,
                    equipment_name: item.equipment_name,
                    equipment_type: DEMO_DATA.equipment.find(eq => eq.equipment_id === item.equipment_id)?.equipment_type || '',
                    rental_date: item.rental_date,
                    return_date: item.return_date,
                    rental_days: item.rental_days,
                    rental_cost: item.rental_cost,
                    status: item.status
                })));
            }
            if (section === 'market-sales-summary') {
                return demoJsonResponse(DEMO_DATA.markets.map(market => {
                    const sales = DEMO_DATA.sales.filter(item => item.market_name === market.market_name);
                    const totalRevenue = sales.reduce((sum, item) => sum + Number(item.total_sale_amount || 0), 0);
                    const totalQuantity = sales.reduce((sum, item) => sum + Number(item.quantity_sold || 0), 0);
                    return {
                        market_id: market.market_id,
                        market_name: market.market_name,
                        location: market.location,
                        total_sales: sales.length,
                        total_quantity_sold: totalQuantity,
                        total_revenue: totalRevenue
                    };
                }));
            }
        }
    }

    const collectionMap = {
        farmers: DEMO_DATA.farmers,
        crops: DEMO_DATA.crops,
        land: DEMO_DATA.land,
        markets: DEMO_DATA.markets,
        equipment: DEMO_DATA.equipment,
        'equipment-rentals': DEMO_DATA.equipmentRentals,
        fertilizers: DEMO_DATA.fertilizers,
        'planting-records': DEMO_DATA.plantingRecords,
        harvest: DEMO_DATA.harvests,
        sales: DEMO_DATA.sales,
        weather: DEMO_DATA.weather,
        'fertilizer-usage': DEMO_DATA.fertilizerUsages,
        'profit-calculation': DEMO_DATA.profitCalculations
    };

    const targetList = collectionMap[collection];
    if (!targetList) return null;

    if (method === 'GET') {
        if (id !== undefined) {
            const item = targetList.find(record => Number(record[Object.keys(record)[0]] || record.id) === id) || targetList.find(record => Number(record[Object.keys(record)[0]]) === id);
            if (!item) {
                return demoJsonResponse({ error: 'Record not found' }, 404);
            }
            return demoJsonResponse(item);
        }
        return demoJsonResponse(targetList);
    }

    if (method === 'POST') {
        const nextId = demoNextId(targetList, Object.keys(targetList[0] || { [collection]: 1 })[0]);
        const newItem = { ...body, [Object.keys(targetList[0] || {})[0]]: nextId };
        targetList.unshift(newItem);
        return demoJsonResponse({ success: true, message: 'Created successfully', [Object.keys(newItem)[0]]: nextId }, 201);
    }

    if (method === 'PUT') {
        if (id === undefined) {
            return demoJsonResponse({ error: 'Missing ID' }, 400);
        }
        const index = targetList.findIndex(record => Number(record[Object.keys(record)[0]]) === id);
        if (index === -1) {
            return demoJsonResponse({ error: 'Record not found' }, 404);
        }
        targetList[index] = { ...targetList[index], ...body };
        return demoJsonResponse({ success: true, message: 'Updated successfully' });
    }

    if (method === 'DELETE') {
        if (id === undefined) {
            return demoJsonResponse({ error: 'Missing ID' }, 400);
        }
        const index = targetList.findIndex(record => Number(record[Object.keys(record)[0]]) === id);
        if (index === -1) {
            return demoJsonResponse({ error: 'Record not found' }, 404);
        }
        targetList.splice(index, 1);
        return demoJsonResponse({ success: true, message: 'Deleted successfully' });
    }

    return null;
}

const nativeFetch = window.fetch.bind(window);
window.fetch = async function patchedFetch(input, init = {}) {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    if (url && url.startsWith(API_URL)) {
        const demoResponse = handleDemoRequest(url, init);
        if (demoResponse) {
            return demoResponse;
        }
    }
    return nativeFetch(input, init);
};

// Farmers API calls

async function fetchFarmers() {
    try {
        const response = await fetch(`${API_URL}/farmers`);
        if (!response.ok) throw new Error('Failed to fetch farmers');
        return await response.json();
    } catch (error) {
        console.error('Error fetching farmers:', error);
        throw error;
    }
}

async function fetchFarmer(farmerId) {
    try {
        const response = await fetch(`${API_URL}/farmers/${farmerId}`);
        if (!response.ok) throw new Error('Farmer not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching farmer:', error);
        throw error;
    }
}

async function createFarmer(farmerData) {
    try {
        const response = await fetch(`${API_URL}/farmers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(farmerData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create farmer');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating farmer:', error);
        throw error;
    }
}

async function updateFarmer(farmerId, farmerData) {
    try {
        const response = await fetch(`${API_URL}/farmers/${farmerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(farmerData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update farmer');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating farmer:', error);
        throw error;
    }
}

async function deleteFarmer(farmerId) {
    try {
        const response = await fetch(`${API_URL}/farmers/${farmerId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete farmer');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting farmer:', error);
        throw error;
    }
}

// Crops API calls

async function fetchCrops() {
    try {
        const response = await fetch(`${API_URL}/crops`);
        if (!response.ok) throw new Error('Failed to fetch crops');
        return await response.json();
    } catch (error) {
        console.error('Error fetching crops:', error);
        throw error;
    }
}

async function fetchCrop(cropId) {
    try {
        const response = await fetch(`${API_URL}/crops/${cropId}`);
        if (!response.ok) throw new Error('Crop not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching crop:', error);
        throw error;
    }
}

async function createCrop(cropData) {
    try {
        const response = await fetch(`${API_URL}/crops`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cropData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create crop');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating crop:', error);
        throw error;
    }
}

async function updateCrop(cropId, cropData) {
    try {
        const response = await fetch(`${API_URL}/crops/${cropId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cropData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update crop');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating crop:', error);
        throw error;
    }
}

async function deleteCrop(cropId) {
    try {
        const response = await fetch(`${API_URL}/crops/${cropId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete crop');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting crop:', error);
        throw error;
    }
}

// Land API calls

async function fetchLand() {
    try {
        const response = await fetch(`${API_URL}/land`);
        if (!response.ok) throw new Error('Failed to fetch land');
        return await response.json();
    } catch (error) {
        console.error('Error fetching land:', error);
        throw error;
    }
}

async function createLand(landData) {
    try {
        const response = await fetch(`${API_URL}/land`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(landData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create land');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating land:', error);
        throw error;
    }
}

async function updateLand(landId, landData) {
    try {
        const response = await fetch(`${API_URL}/land/${landId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(landData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update land');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating land:', error);
        throw error;
    }
}

async function deleteLand(landId) {
    try {
        const response = await fetch(`${API_URL}/land/${landId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete land');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting land:', error);
        throw error;
    }
}

// Markets API calls

async function fetchMarkets() {
    const response = await fetch(`${API_URL}/markets`);
    if (!response.ok) throw new Error('Failed to fetch markets');
    return await response.json();
}

async function fetchMarket(marketId) {
    const response = await fetch(`${API_URL}/markets/${marketId}`);
    if (!response.ok) throw new Error('Market not found');
    return await response.json();
}

async function createMarket(marketData) {
    const response = await fetch(`${API_URL}/markets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(marketData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create market');
    }
    return await response.json();
}

async function updateMarket(marketId, marketData) {
    const response = await fetch(`${API_URL}/markets/${marketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(marketData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update market');
    }
    return await response.json();
}

async function deleteMarket(marketId) {
    const response = await fetch(`${API_URL}/markets/${marketId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete market');
    }
    return await response.json();
}

// Planting records API calls

async function fetchPlantingRecords() {
    const response = await fetch(`${API_URL}/planting-records`);
    if (!response.ok) throw new Error('Failed to fetch planting records');
    return await response.json();
}

async function createPlantingRecord(recordData) {
    const response = await fetch(`${API_URL}/planting-records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create planting record');
    }
    return await response.json();
}

async function updatePlantingRecord(recordId, recordData) {
    const response = await fetch(`${API_URL}/planting-records/${recordId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update planting record');
    }
    return await response.json();
}

async function deletePlantingRecord(recordId) {
    const response = await fetch(`${API_URL}/planting-records/${recordId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete planting record');
    }
    return await response.json();
}

// Harvest API calls

async function fetchHarvests() {
    const response = await fetch(`${API_URL}/harvest`);
    if (!response.ok) throw new Error('Failed to fetch harvests');
    return await response.json();
}

async function createHarvest(harvestData) {
    const response = await fetch(`${API_URL}/harvest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(harvestData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create harvest');
    }
    return await response.json();
}

async function updateHarvest(harvestId, harvestData) {
    const response = await fetch(`${API_URL}/harvest/${harvestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(harvestData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update harvest');
    }
    return await response.json();
}

async function deleteHarvest(harvestId) {
    const response = await fetch(`${API_URL}/harvest/${harvestId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete harvest');
    }
    return await response.json();
}

// Sales API calls

async function fetchSales() {
    const response = await fetch(`${API_URL}/sales`);
    if (!response.ok) throw new Error('Failed to fetch sales');
    return await response.json();
}

async function createSale(saleData) {
    const response = await fetch(`${API_URL}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create sale');
    }
    return await response.json();
}

async function updateSale(saleId, saleData) {
    const response = await fetch(`${API_URL}/sales/${saleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update sale');
    }
    return await response.json();
}

async function deleteSale(saleId) {
    const response = await fetch(`${API_URL}/sales/${saleId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete sale');
    }
    return await response.json();
}

// Weather API calls

async function fetchWeather() {
    const response = await fetch(`${API_URL}/weather`);
    if (!response.ok) throw new Error('Failed to fetch weather records');
    return await response.json();
}

async function createWeather(weatherData) {
    const response = await fetch(`${API_URL}/weather`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weatherData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create weather record');
    }
    return await response.json();
}

async function updateWeather(weatherId, weatherData) {
    const response = await fetch(`${API_URL}/weather/${weatherId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weatherData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update weather record');
    }
    return await response.json();
}

async function deleteWeather(weatherId) {
    const response = await fetch(`${API_URL}/weather/${weatherId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete weather record');
    }
    return await response.json();
}

// Equipment API calls

async function fetchEquipment() {
    const response = await fetch(`${API_URL}/equipment`);
    if (!response.ok) throw new Error('Failed to fetch equipment');
    return await response.json();
}

async function createEquipment(equipmentData) {
    const response = await fetch(`${API_URL}/equipment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(equipmentData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create equipment');
    }
    return await response.json();
}

async function updateEquipment(equipmentId, equipmentData) {
    const response = await fetch(`${API_URL}/equipment/${equipmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(equipmentData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update equipment');
    }
    return await response.json();
}

async function deleteEquipment(equipmentId) {
    const response = await fetch(`${API_URL}/equipment/${equipmentId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete equipment');
    }
    return await response.json();
}





// ============================================================
// Equipment Rental API helpers
// ============================================================

async function fetchEquipmentRentals() {
    const response = await fetch(`${API_URL}/equipment-rentals`);
    if (!response.ok) throw new Error('Failed to fetch equipment rentals');
    return await response.json();
}

async function fetchEquipmentRental(rentalId) {
    const response = await fetch(`${API_URL}/equipment-rentals/${rentalId}`);
    if (!response.ok) throw new Error('Failed to fetch equipment rental');
    return await response.json();
}

async function createEquipmentRental(rentalData) {
    const response = await fetch(`${API_URL}/equipment-rentals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rentalData)
    });
    if (!response.ok) throw new Error('Failed to create equipment rental');
    return await response.json();
}

async function updateEquipmentRental(rentalId, rentalData) {
    const response = await fetch(`${API_URL}/equipment-rentals/${rentalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rentalData)
    });
    if (!response.ok) throw new Error('Failed to update equipment rental');
    return await response.json();
}

async function deleteEquipmentRental(rentalId) {
    const response = await fetch(`${API_URL}/equipment-rentals/${rentalId}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete equipment rental');
    return await response.json();
}

// ============================================================
// Fertilizer API helpers
// ============================================================

async function fetchFertilizers() {
    const response = await fetch(`${API_URL}/fertilizers`);
    if (!response.ok) throw new Error('Failed to fetch fertilizers');
    return await response.json();
}

async function fetchFertilizer(id) {
    const response = await fetch(`${API_URL}/fertilizers/${id}`);
    if (!response.ok) throw new Error('Failed to fetch fertilizer');
    return await response.json();
}

async function createFertilizer(data) {
    const response = await fetch(`${API_URL}/fertilizers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create fertilizer');
    return await response.json();
}

async function updateFertilizer(id, data) {
    const response = await fetch(`${API_URL}/fertilizers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update fertilizer');
    return await response.json();
}

async function deleteFertilizer(id) {
    const response = await fetch(`${API_URL}/fertilizers/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete fertilizer');
    return await response.json();
}

// ============================================================
// Fertilizer Usage API helpers
// ============================================================

async function fetchFertilizerUsages() {
    const response = await fetch(`${API_URL}/fertilizer-usage`);
    if (!response.ok) throw new Error('Failed to fetch fertilizer usage');
    return await response.json();
}

async function fetchFertilizerUsage(id) {
    const response = await fetch(`${API_URL}/fertilizer-usage/${id}`);
    if (!response.ok) throw new Error('Failed to fetch fertilizer usage');
    return await response.json();
}

async function createFertilizerUsage(data) {
    const response = await fetch(`${API_URL}/fertilizer-usage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create fertilizer usage');
    return await response.json();
}

async function updateFertilizerUsage(id, data) {
    const response = await fetch(`${API_URL}/fertilizer-usage/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update fertilizer usage');
    return await response.json();
}

async function deleteFertilizerUsage(id) {
    const response = await fetch(`${API_URL}/fertilizer-usage/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete fertilizer usage');
    return await response.json();
}




// ============================================================
// Profit Calculation API helpers
// ============================================================

async function fetchProfitCalculations() {
    const response = await fetch(`${API_URL}/profit-calculation`);
    if (!response.ok) throw new Error('Failed to fetch profit calculations');
    return await response.json();
}

async function fetchProfitCalculation(id) {
    const response = await fetch(`${API_URL}/profit-calculation/${id}`);
    if (!response.ok) throw new Error('Failed to fetch profit calculation');
    return await response.json();
}

async function createProfitCalculation(data) {
    const response = await fetch(`${API_URL}/profit-calculation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create profit calculation');
    return await response.json();
}

async function updateProfitCalculation(id, data) {
    const response = await fetch(`${API_URL}/profit-calculation/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update profit calculation');
    return await response.json();
}

async function deleteProfitCalculation(id) {
    const response = await fetch(`${API_URL}/profit-calculation/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete profit calculation');
    return await response.json();
}




// ============================================================
// Reports API helpers
// ============================================================

async function fetchFarmerProfitSummary() {
    const response = await fetch(`${API_URL}/reports/farmer-profit-summary`);
    if (!response.ok) throw new Error('Failed to fetch farmer profit summary');
    return await response.json();
}

async function fetchEquipmentRentalDetails() {
    const response = await fetch(`${API_URL}/reports/equipment-rental-details`);
    if (!response.ok) throw new Error('Failed to fetch equipment rental details');
    return await response.json();
}

async function fetchMarketSalesSummary() {
    const response = await fetch(`${API_URL}/reports/market-sales-summary`);
    if (!response.ok) throw new Error('Failed to fetch market sales summary');
    return await response.json();
}