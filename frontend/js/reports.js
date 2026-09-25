// ============================================================
// reports.js
// Report Generation frontend logic
// ============================================================

// Column definitions for each report type
const REPORT_CONFIGS = {
    'farmer-profit-summary': {
        title: 'Farmer Profit Summary',
        fetcher: fetchFarmerProfitSummary,
        columns: [
            { key: 'farmer_id', label: 'ID' },
            { key: 'farmer_name', label: 'Farmer' },
            { key: 'total_records', label: 'Records' },
            { key: 'total_revenue', label: 'Total Revenue' },
            { key: 'total_cost', label: 'Total Cost' },
            { key: 'total_net_profit', label: 'Net Profit' }
        ]
    },
    'equipment-rental-details': {
        title: 'Equipment Rental Details',
        fetcher: fetchEquipmentRentalDetails,
        columns: [
            { key: 'rental_id', label: 'Rental ID' },
            { key: 'farmer_name', label: 'Farmer' },
            { key: 'equipment_name', label: 'Equipment' },
            { key: 'equipment_type', label: 'Type' },
            { key: 'rental_date', label: 'Rental Date' },
            { key: 'return_date', label: 'Return Date' },
            { key: 'rental_days', label: 'Days' },
            { key: 'rental_cost', label: 'Cost' },
            { key: 'status', label: 'Status' }
        ]
    },
    'market-sales-summary': {
        title: 'Market Sales Summary',
        fetcher: fetchMarketSalesSummary,
        columns: [
            { key: 'market_id', label: 'ID' },
            { key: 'market_name', label: 'Market' },
            { key: 'location', label: 'Location' },
            { key: 'total_sales', label: 'Total Sales' },
            { key: 'total_quantity_sold', label: 'Total Quantity' },
            { key: 'total_revenue', label: 'Total Revenue' }
        ]
    }
};


// ---------- Load a report ----------
async function loadReport() {
    const reportType = document.getElementById('report-select').value;
    const container = document.getElementById('report-table-container');
    const titleElement = document.getElementById('report-result-title');

    if (!container) return;

    if (!reportType) {
        container.innerHTML =
            '<p class="no-data">Select a report from the dropdown above.</p>';
        if (titleElement) titleElement.textContent = '';
        return;
    }

    const config = REPORT_CONFIGS[reportType];

    container.innerHTML = '<p class="loading">Loading report...</p>';

    try {
        const data = await config.fetcher();

        if (titleElement) {
            titleElement.textContent = config.title;
        }

        if (!data || data.length === 0) {
            container.innerHTML =
                '<p class="no-data">No data available for this report.</p>';
            return;
        }

        // generateTableHTML is provided by utils.js
        container.innerHTML = generateTableHTML(
            data,
            config.columns,
            null
        );

    } catch (error) {
        console.error('Error loading report:', error);
        container.innerHTML =
            '<p class="no-data">Failed to load report.</p>';
    }
}


// ---------- Reset the report view ----------
function resetReportView() {
    const select = document.getElementById('report-select');
    if (select) select.value = '';

    const container = document.getElementById('report-table-container');
    if (container) {
        container.innerHTML =
            '<p class="no-data">Select a report from the dropdown above.</p>';
    }

    const titleElement = document.getElementById('report-result-title');
    if (titleElement) titleElement.textContent = '';
}