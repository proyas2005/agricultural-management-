// Sales module

let editingSaleId = null;

async function loadMarketsForSalesDropdown() {
    try {
        const markets = await fetchMarkets();
        const select = document.getElementById('sale-market-id');
        while (select.options.length > 1) select.remove(1);

        markets.forEach(market => {
            const option = document.createElement('option');
            option.value = market.market_id;
            option.textContent = market.market_name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading market dropdown:', error);
    }
}

async function loadHarvestsForSalesDropdown() {
    try {
        const harvests = await fetchHarvests();
        const select = document.getElementById('sale-harvest-id');
        while (select.options.length > 1) select.remove(1);

        harvests.forEach(item => {
            const option = document.createElement('option');
            option.value = item.harvest_id;
            option.textContent = `${item.crop_name} • ${item.land_name} • ${item.harvest_date}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading harvest dropdown:', error);
    }
}

async function loadSales() {
    try {
        const sales = await fetchSales();
        updateStatCard('sale-count', sales.length);

        const container = document.getElementById('sales-table-container');
        const columns = [
            { key: 'sale_id', label: 'ID' },
            { key: 'crop_name', label: 'Crop' },
            { key: 'market_name', label: 'Market' },
            { key: 'sale_date', label: 'Sale Date', formatter: formatDate },
            { key: 'quantity_sold', label: 'Qty Sold', formatter: value => value ? formatNumber(value) : '-' },
            { key: 'price_per_unit', label: 'Price/Unit', formatter: value => value ? formatNumber(value) : '-' },
            { key: 'total_sale_amount', label: 'Total', formatter: value => value ? formatNumber(value) : '-' }
        ];

        const actionsHTML = (item) => `
            <div class="action-buttons">
                <button class="btn-edit" onclick="editSale(${item.sale_id})">Edit</button>
                <button class="btn-danger" onclick="deleteSaleConfirm(${item.sale_id})">Delete</button>
            </div>
        `;

        container.innerHTML = generateTableHTML(sales, columns, actionsHTML);
    } catch (error) {
        console.error('Error loading sales:', error);
        const container = document.getElementById('sales-table-container');
        if (container) {
            container.innerHTML = '<div class="no-data">No sales records available yet.</div>';
        }
        updateStatCard('sale-count', 0);
    }
}

async function addOrUpdateSale() {
    const harvestId = document.getElementById('sale-harvest-id').value;
    const saleDate = document.getElementById('sale-date').value;

    if (!harvestId || !saleDate) {
        showAlert('sales-alert', 'Harvest and sale date are required', 'error');
        return;
    }

    const saleData = {
        harvest_id: parseInt(harvestId),
        market_id: document.getElementById('sale-market-id').value || null,
        sale_date: saleDate,
        quantity_sold: document.getElementById('sale-quantity').value || null,
        quantity_unit: document.getElementById('sale-unit').value || null,
        price_per_unit: document.getElementById('sale-price').value || null,
        total_sale_amount: document.getElementById('sale-total').value || null,
        notes: document.getElementById('sale-notes').value || null
    };

    try {
        if (editingSaleId) {
            await updateSale(editingSaleId, saleData);
            showAlert('sales-alert', 'Sale updated successfully!', 'success');
        } else {
            await createSale(saleData);
            showAlert('sales-alert', 'Sale added successfully!', 'success');
        }
        resetSaleForm();
        loadSales();
    } catch (error) {
        showAlert('sales-alert', getErrorMessage(error), 'error');
    }
}

async function editSale(saleId) {
    try {
        const sales = await fetchSales();
        const sale = sales.find(item => item.sale_id === saleId);
        if (!sale) return;


        document.getElementById('sale-harvest-id').value = sale.harvest_id;
        document.getElementById('sale-market-id').value = sale.market_id || '';

        document.getElementById('sale-date').value = (sale.sale_date || '').substring(0, 10);

        document.getElementById('sale-quantity').value = sale.quantity_sold || '';
        document.getElementById('sale-unit').value = sale.quantity_unit || '';
        document.getElementById('sale-price').value = sale.price_per_unit || '';
        document.getElementById('sale-total').value = sale.total_sale_amount || '';
        document.getElementById('sale-notes').value = sale.notes || '';


        editingSaleId = saleId;
        document.querySelector('#sales .form-title').textContent = `Edit Sale - ID: ${saleId}`;
        document.querySelector('#sales .form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showAlert('sales-alert', getErrorMessage(error), 'error');
    }
}

async function deleteSaleConfirm(saleId) {
    if (!confirmAction('Are you sure you want to delete this sale record?')) return;

    try {
        await deleteSale(saleId);
        showAlert('sales-alert', 'Sale deleted successfully!', 'success');
        loadSales();
    } catch (error) {
        showAlert('sales-alert', getErrorMessage(error), 'error');
    }
}

function resetSaleForm() {
    clearFormInputs([
        'sale-harvest-id',
        'sale-market-id',
        'sale-date',
        'sale-quantity',
        'sale-unit',
        'sale-price',
        'sale-total',
        'sale-notes'
    ]);
    editingSaleId = null;
    document.querySelector('#sales .form-title').textContent = 'Add/Edit Sale';
}
