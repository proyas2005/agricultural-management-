// Harvest module

let editingHarvestId = null;

async function loadPlantingRecordsForHarvestDropdown() {
    try {
        const records = await fetchPlantingRecords();
        const select = document.getElementById('harvest-planting-id');
        while (select.options.length > 1) select.remove(1);

        records.forEach(record => {
            const option = document.createElement('option');
            option.value = record.planting_id;
            option.textContent = `${record.crop_name} • ${record.land_name} • ${record.planting_date}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading planting dropdown:', error);
    }
}

async function loadHarvests() {
    try {
        const harvests = await fetchHarvests();
        updateStatCard('harvest-count', harvests.length);

        const container = document.getElementById('harvest-table-container');
        const columns = [
            { key: 'harvest_id', label: 'ID' },
            { key: 'crop_name', label: 'Crop' },
            { key: 'land_name', label: 'Land' },
            { key: 'harvest_date', label: 'Harvest Date', formatter: formatDate },
            { key: 'quantity_harvested', label: 'Qty Harvested', formatter: value => value ? formatNumber(value) : '-' },
            { key: 'quantity_unit', label: 'Unit' },
            { key: 'quality', label: 'Quality' }
        ];

        const actionsHTML = (item) => `
            <div class="action-buttons">
                <button class="btn-edit" onclick="editHarvest(${item.harvest_id})">Edit</button>
                <button class="btn-danger" onclick="deleteHarvestConfirm(${item.harvest_id})">Delete</button>
            </div>
        `;

        container.innerHTML = generateTableHTML(harvests, columns, actionsHTML);
    } catch (error) {
        console.error('Error loading harvests:', error);
        const container = document.getElementById('harvest-table-container');
        if (container) {
            container.innerHTML = '<div class="no-data">No harvest records available yet.</div>';
        }
        updateStatCard('harvest-count', 0);
    }
}

async function addOrUpdateHarvest() {
    const plantingId = document.getElementById('harvest-planting-id').value;
    const harvestDate = document.getElementById('harvest-date').value;

    if (!plantingId || !harvestDate) {
        showAlert('harvest-alert', 'Planting record and harvest date are required', 'error');
        return;
    }

    const harvestData = {
        planting_id: parseInt(plantingId),
        harvest_date: harvestDate,
        quantity_harvested: document.getElementById('harvest-quantity').value || null,
        quantity_unit: document.getElementById('harvest-unit').value || null,
        quality: document.getElementById('harvest-quality').value || null,
        notes: document.getElementById('harvest-notes').value || null
    };

    try {
        if (editingHarvestId) {
            await updateHarvest(editingHarvestId, harvestData);
            showAlert('harvest-alert', 'Harvest updated successfully!', 'success');
        } else {
            await createHarvest(harvestData);
            showAlert('harvest-alert', 'Harvest added successfully!', 'success');
        }
        resetHarvestForm();
        loadHarvests();
    } catch (error) {
        showAlert('harvest-alert', getErrorMessage(error), 'error');
    }
}

async function editHarvest(harvestId) {
    try {
        const harvests = await fetchHarvests();
        const harvest = harvests.find(item => item.harvest_id === harvestId);
        if (!harvest) return;


        document.getElementById('harvest-planting-id').value = harvest.planting_id;

        
        document.getElementById('harvest-date').value = (harvest.harvest_date || '').substring(0, 10);

        document.getElementById('harvest-quantity').value = harvest.quantity_harvested || '';
        document.getElementById('harvest-unit').value = harvest.quantity_unit || '';
        document.getElementById('harvest-quality').value = harvest.quality || '';
        document.getElementById('harvest-notes').value = harvest.notes || '';


        editingHarvestId = harvestId;
        document.querySelector('#harvest .form-title').textContent = `Edit Harvest - ID: ${harvestId}`;
        document.querySelector('#harvest .form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showAlert('harvest-alert', getErrorMessage(error), 'error');
    }
}

async function deleteHarvestConfirm(harvestId) {
    if (!confirmAction('Are you sure you want to delete this harvest record?')) return;

    try {
        await deleteHarvest(harvestId);
        showAlert('harvest-alert', 'Harvest record deleted successfully!', 'success');
        loadHarvests();
    } catch (error) {
        showAlert('harvest-alert', getErrorMessage(error), 'error');
    }
}

function resetHarvestForm() {
    clearFormInputs([
        'harvest-planting-id',
        'harvest-date',
        'harvest-quantity',
        'harvest-unit',
        'harvest-quality',
        'harvest-notes'
    ]);
    editingHarvestId = null;
    document.querySelector('#harvest .form-title').textContent = 'Add/Edit Harvest';
}
