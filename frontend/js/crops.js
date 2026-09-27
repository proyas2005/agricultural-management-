// Crops module

let editingCropId = null;

// Load and display all crops
async function loadCrops() {
    try {
        const crops = await fetchCrops();

        // Update count
        updateStatCard('crop-count', crops.length);

        // Display table
        const container = document.getElementById('crops-table-container');

        const columns = [
            { key: 'crop_id', label: 'ID' },
            { key: 'crop_name', label: 'Crop Name' },
            { key: 'crop_type', label: 'Type' },
            { key: 'planting_season', label: 'Planting Season' },
            { key: 'harvest_season', label: 'Harvest Season' },
            {
                key: 'avg_yield_per_area',
                label: 'Avg Yield',
                formatter: (value, item) => {
                    if (!value) return '-';
                    return `${formatNumber(value)} ${item.yield_unit || ''}`;
                }
            }
        ];

        const actionsHTML = (crop) => {
            return `
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editCrop(${crop.crop_id})">Edit</button>
                    <button class="btn-danger" onclick="deleteCropConfirm(${crop.crop_id})">Delete</button>
                </div>
            `;
        };

        container.innerHTML = generateTableHTML(crops, columns, actionsHTML);
    } catch (error) {
        console.error('Error loading crops:', error);
        const container = document.getElementById('crops-table-container');
        if (container) {
            container.innerHTML = '<div class="no-data">No crops available yet.</div>';
        }
        updateStatCard('crop-count', 0);
    }
}

// Add or update crop
async function addOrUpdateCrop() {
    const cropName = document.getElementById('crop-name').value;

    // Validation
    if (!cropName) {
        showAlert('crops-alert', 'Crop name is required', 'error');
        return;
    }

    const cropData = {
        crop_name: cropName,
        crop_type: document.getElementById('crop-type').value || null,
        description: document.getElementById('crop-description').value || null,
        planting_season: document.getElementById('crop-planting-season').value || null,
        harvest_season: document.getElementById('crop-harvest-season').value || null,
        avg_yield_per_area: parseFloat(document.getElementById('crop-yield').value) || null,
        yield_unit: document.getElementById('crop-yield-unit').value || null
    };

    try {
        if (editingCropId) {
            await updateCrop(editingCropId, cropData);
            showAlert('crops-alert', 'Crop updated successfully!', 'success');
        } else {
            await createCrop(cropData);
            showAlert('crops-alert', 'Crop added successfully!', 'success');
        }
        resetCropForm();
        loadCrops();
    } catch (error) {
        const message = getErrorMessage(error);
        showAlert('crops-alert', message, 'error');
    }
}

// Edit crop - load crop data into form
async function editCrop(cropId) {
    try {
        const crops = await fetchCrops();
        const crop = crops.find(c => c.crop_id === cropId);

        if (crop) {
            document.getElementById('crop-name').value = crop.crop_name;
            document.getElementById('crop-type').value = crop.crop_type || '';
            document.getElementById('crop-description').value = crop.description || '';
            document.getElementById('crop-planting-season').value = crop.planting_season || '';
            document.getElementById('crop-harvest-season').value = crop.harvest_season || '';
            document.getElementById('crop-yield').value = crop.avg_yield_per_area || '';
            document.getElementById('crop-yield-unit').value = crop.yield_unit || '';

            editingCropId = cropId;
            document.querySelector('#crops .form-title').textContent = `Edit Crop - ID: ${cropId}`;

            // Scroll to form
            document.querySelector('#crops .form-section').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error loading crop:', error);
        showAlert('crops-alert', 'Error loading crop', 'error');
    }
}

// Delete crop with confirmation
async function deleteCropConfirm(cropId) {
    if (!confirmAction('Are you sure you want to delete this crop? This action cannot be undone.')) {
        return;
    }

    try {
        await deleteCrop(cropId);
        showAlert('crops-alert', 'Crop deleted successfully!', 'success');
        loadCrops();
    } catch (error) {
        const message = getErrorMessage(error);
        showAlert('crops-alert', message, 'error');
    }
}

// Reset crop form to initial state
function resetCropForm() {
    const inputIds = [
        'crop-name',
        'crop-type',
        'crop-description',
        'crop-planting-season',
        'crop-harvest-season',
        'crop-yield',
        'crop-yield-unit'
    ];

    clearFormInputs(inputIds);
    editingCropId = null;
    document.querySelector('#crops .form-title').textContent = 'Add/Edit Crop';
}
