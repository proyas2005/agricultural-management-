// Planting records module

let editingPlantingRecordId = null;

async function loadLandForPlantingRecordsDropdown() {
    try {
        const lands = await fetchLand();
        const select = document.getElementById('planting-land-id');
        while (select.options.length > 1) select.remove(1);

        lands.forEach(land => {
            const option = document.createElement('option');
            option.value = land.land_id;
            option.textContent = `${land.land_name || 'Land'} (${land.area || 0} ${land.area_unit || 'ha'})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading land dropdown:', error);
    }
}

async function loadCropsForPlantingRecordsDropdown() {
    try {
        const crops = await fetchCrops();
        const select = document.getElementById('planting-crop-id');
        while (select.options.length > 1) select.remove(1);

        crops.forEach(crop => {
            const option = document.createElement('option');
            option.value = crop.crop_id;
            option.textContent = crop.crop_name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading crop dropdown:', error);
    }
}

async function loadPlantingRecords() {
    try {
        const records = await fetchPlantingRecords();
        updateStatCard('planting-record-count', records.length);

        const container = document.getElementById('planting-records-table-container');
        const columns = [
            { key: 'planting_id', label: 'ID' },
            { key: 'land_name', label: 'Land' },
            { key: 'crop_name', label: 'Crop' },
            { key: 'planting_date', label: 'Planting Date', formatter: formatDate },
            { key: 'expected_harvest_date', label: 'Expected Harvest', formatter: formatDate },
            { key: 'quantity_planted', label: 'Qty Planted', formatter: value => value ? formatNumber(value) : '-' },
            { key: 'quantity_unit', label: 'Unit' }
        ];

        const actionsHTML = (record) => `
            <div class="action-buttons">
                <button class="btn-edit" onclick="editPlantingRecord(${record.planting_id})">Edit</button>
                <button class="btn-danger" onclick="deletePlantingRecordConfirm(${record.planting_id})">Delete</button>
            </div>
        `;

        container.innerHTML = generateTableHTML(records, columns, actionsHTML);
    } catch (error) {
        console.error('Error loading planting records:', error);
        const container = document.getElementById('planting-records-table-container');
        if (container) {
            container.innerHTML = '<div class="no-data">No planting records available yet.</div>';
        }
        updateStatCard('planting-record-count', 0);
    }
}

async function addOrUpdatePlantingRecord() {
    const landId = document.getElementById('planting-land-id').value;
    const cropId = document.getElementById('planting-crop-id').value;
    const plantingDate = document.getElementById('planting-date').value;

    if (!landId || !cropId || !plantingDate) {
        showAlert('planting-records-alert', 'Land, crop, and planting date are required', 'error');
        return;
    }

    const recordData = {
        land_id: parseInt(landId),
        crop_id: parseInt(cropId),
        planting_date: plantingDate,
        expected_harvest_date: document.getElementById('planting-expected-date').value || null,
        quantity_planted: document.getElementById('planting-quantity').value || null,
        quantity_unit: document.getElementById('planting-unit').value || null,
        fertilizer_used: document.getElementById('planting-fertilizer').value || null,
        fertilizer_amount: document.getElementById('planting-fertilizer-amount').value || null,
        notes: document.getElementById('planting-notes').value || null
    };

    try {
        if (editingPlantingRecordId) {
            await updatePlantingRecord(editingPlantingRecordId, recordData);
            showAlert('planting-records-alert', 'Planting record updated successfully!', 'success');
        } else {
            await createPlantingRecord(recordData);
            showAlert('planting-records-alert', 'Planting record added successfully!', 'success');
        }
        resetPlantingRecordForm();
        loadPlantingRecords();
    } catch (error) {
        showAlert('planting-records-alert', getErrorMessage(error), 'error');
    }
}

async function editPlantingRecord(recordId) {
    try {
        const records = await fetchPlantingRecords();
        const record = records.find(item => item.planting_id === recordId);
        if (!record) return;



        document.getElementById('planting-land-id').value = record.land_id;
        document.getElementById('planting-crop-id').value = record.crop_id;

        document.getElementById('planting-date').value = (record.planting_date || '').substring(0, 10);
        document.getElementById('planting-expected-date').value = (record.expected_harvest_date || '').substring(0, 10);

        document.getElementById('planting-quantity').value = record.quantity_planted || '';
        document.getElementById('planting-unit').value = record.quantity_unit || '';
        document.getElementById('planting-fertilizer').value = record.fertilizer_used || '';
        document.getElementById('planting-fertilizer-amount').value = record.fertilizer_amount || '';
        document.getElementById('planting-notes').value = record.notes || '';


        
        editingPlantingRecordId = recordId;
        document.querySelector('#planting-records .form-title').textContent = `Edit Planting Record - ID: ${recordId}`;
        document.querySelector('#planting-records .form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showAlert('planting-records-alert', getErrorMessage(error), 'error');
    }
}

async function deletePlantingRecordConfirm(recordId) {
    if (!confirmAction('Are you sure you want to delete this planting record?')) return;

    try {
        await deletePlantingRecord(recordId);
        showAlert('planting-records-alert', 'Planting record deleted successfully!', 'success');
        loadPlantingRecords();
    } catch (error) {
        showAlert('planting-records-alert', getErrorMessage(error), 'error');
    }
}

function resetPlantingRecordForm() {
    clearFormInputs([
        'planting-land-id',
        'planting-crop-id',
        'planting-date',
        'planting-expected-date',
        'planting-quantity',
        'planting-unit',
        'planting-fertilizer',
        'planting-fertilizer-amount',
        'planting-notes'
    ]);
    editingPlantingRecordId = null;
    document.querySelector('#planting-records .form-title').textContent = 'Add/Edit Planting Record';
}
