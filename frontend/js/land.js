// Land module

let editingLandId = null;

// Load farmers into dropdown for land form
async function loadFarmersForLandDropdown() {
    try {
        const farmers = await fetchFarmers();
        const select = document.getElementById('land-farmer-id');

        // Clear existing options except the first one
        while (select.options.length > 1) {
            select.remove(1);
        }

        // Add farmer options
        farmers.forEach(farmer => {
            const option = document.createElement('option');
            option.value = farmer.farmer_id;
            option.textContent = `${farmer.first_name} ${farmer.last_name}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading farmers for dropdown:', error);
        const select = document.getElementById('land-farmer-id');
        if (select) {
            select.innerHTML = '<option value="">No farmers available</option>';
        }
    }
}

// Load and display all land
async function loadLand() {
    try {
        const lands = await fetchLand();

        // Update count
        updateStatCard('land-count', lands.length);

        // Display table
        const container = document.getElementById('land-table-container');

        const columns = [
            { key: 'land_id', label: 'ID' },
            {
                key: 'farmer_name',
                label: 'Farmer',
                formatter: (value, item) => {
                    return `${item.first_name} ${item.last_name}`;
                }
            },
            { key: 'land_name', label: 'Land Name' },
            {
                key: 'area',
                label: 'Area',
                formatter: (value, item) => {
                    return `${formatNumber(value)} ${item.area_unit}`;
                }
            },
            { key: 'soil_type', label: 'Soil Type' },
            { key: 'location', label: 'Location' }
        ];

        const actionsHTML = (land) => {
            return `
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editLand(${land.land_id})">Edit</button>
                    <button class="btn-danger" onclick="deleteLandConfirm(${land.land_id})">Delete</button>
                </div>
            `;
        };

        container.innerHTML = generateTableHTML(lands, columns, actionsHTML);
    } catch (error) {
        console.error('Error loading land:', error);
        const container = document.getElementById('land-table-container');
        if (container) {
            container.innerHTML = '<div class="no-data">No land records available yet.</div>';
        }
        updateStatCard('land-count', 0);
    }
}

// Add or update land
async function addOrUpdateLand() {
    const farmerId = document.getElementById('land-farmer-id').value;
    const area = document.getElementById('land-area').value;

    // Validation
    if (!farmerId || !area) {
        showAlert('land-alert', 'Farmer and area are required', 'error');
        return;
    }

    const landData = {
        farmer_id: parseInt(farmerId),
        land_name: document.getElementById('land-name').value || null,
        area: parseFloat(area),
        area_unit: document.getElementById('land-area-unit').value || 'hectare',
        soil_type: document.getElementById('land-soil-type').value || null,
        location: document.getElementById('land-location').value || null
    };

    try {
        if (editingLandId) {
            await updateLand(editingLandId, landData);
            showAlert('land-alert', 'Land updated successfully!', 'success');
        } else {
            await createLand(landData);
            showAlert('land-alert', 'Land added successfully!', 'success');
        }
        resetLandForm();
        loadLand();
    } catch (error) {
        const message = getErrorMessage(error);
        showAlert('land-alert', message, 'error');
    }
}

// Edit land - load land data into form
async function editLand(landId) {
    try {
        const lands = await fetchLand();
        const land = lands.find(l => l.land_id === landId);

        if (land) {
            document.getElementById('land-farmer-id').value = land.farmer_id;
            document.getElementById('land-name').value = land.land_name || '';
            document.getElementById('land-area').value = land.area;
            document.getElementById('land-area-unit').value = land.area_unit || 'hectare';
            document.getElementById('land-soil-type').value = land.soil_type || '';
            document.getElementById('land-location').value = land.location || '';

            editingLandId = landId;
            document.querySelector('#land .form-title').textContent = `Edit Land - ID: ${landId}`;

            // Scroll to form
            document.querySelector('#land .form-section').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error loading land:', error);
        const container = document.getElementById('land-table-container');
        if (container) {
            container.innerHTML = '<div class="no-data">No land records available yet.</div>';
        }
        updateStatCard('land-count', 0);
    }
}

// Delete land with confirmation
async function deleteLandConfirm(landId) {
    if (!confirmAction('Are you sure you want to delete this land? This action cannot be undone.')) {
        return;
    }

    try {
        await deleteLand(landId);
        showAlert('land-alert', 'Land deleted successfully!', 'success');
        loadLand();
    } catch (error) {
        const message = getErrorMessage(error);
        showAlert('land-alert', message, 'error');
    }
}

// Reset land form to initial state
function resetLandForm() {
    const inputIds = [
        'land-farmer-id',
        'land-name',
        'land-area',
        'land-area-unit',
        'land-soil-type',
        'land-location'
    ];

    clearFormInputs(inputIds);
    editingLandId = null;
    document.querySelector('#land .form-title').textContent = 'Add/Edit Land';
}
