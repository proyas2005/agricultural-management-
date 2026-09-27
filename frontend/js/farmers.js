// Farmers module

let editingFarmerId = null;

// Load and display all farmers
async function loadFarmers() {
    try {
        const farmers = await fetchFarmers();

        // Update count
        updateStatCard('farmer-count', farmers.length);

        // Display table
        const container = document.getElementById('farmers-table-container');

        const columns = [
            { key: 'farmer_id', label: 'ID' },
            { key: 'first_name', label: 'First Name' },
            { key: 'last_name', label: 'Last Name' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'city', label: 'City' },
            { key: 'experience_years', label: 'Experience (years)' }
        ];

        const actionsHTML = (farmer) => {
            return `
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editFarmer(${farmer.farmer_id})">Edit</button>
                    <button class="btn-danger" onclick="deleteFarmerConfirm(${farmer.farmer_id})">Delete</button>
                </div>
            `;
        };

        container.innerHTML = generateTableHTML(farmers, columns, actionsHTML);
    } catch (error) {
        console.error('Error loading farmers:', error);
        const container = document.getElementById('farmers-table-container');
        if (container) {
            container.innerHTML = '<div class="no-data">No farmers available yet.</div>';
        }
        updateStatCard('farmer-count', 0);
    }
}

// Add or update farmer
async function addOrUpdateFarmer() {
    const firstName = document.getElementById('farmer-first-name').value;
    const lastName = document.getElementById('farmer-last-name').value;

    // Validation
    if (!firstName || !lastName) {
        showAlert('farmers-alert', 'First name and last name are required', 'error');
        return;
    }

    const email = document.getElementById('farmer-email').value;
    if (!isValidEmail(email)) {
        showAlert('farmers-alert', 'Please enter a valid email address', 'error');
        return;
    }

    const farmerData = {
        first_name: firstName,
        last_name: lastName,
        email: email || null,
        phone: document.getElementById('farmer-phone').value || null,
        address: document.getElementById('farmer-address').value || null,
        city: document.getElementById('farmer-city').value || null,
        state: document.getElementById('farmer-state').value || null,
        postal_code: document.getElementById('farmer-postal').value || null,
        country: document.getElementById('farmer-country').value || null,
        experience_years: parseInt(document.getElementById('farmer-experience').value) || 0
    };

    try {
        if (editingFarmerId) {
            await updateFarmer(editingFarmerId, farmerData);
            showAlert('farmers-alert', 'Farmer updated successfully!', 'success');
        } else {
            await createFarmer(farmerData);
            showAlert('farmers-alert', 'Farmer added successfully!', 'success');
        }
        resetFarmerForm();
        loadFarmers();
    } catch (error) {
        const message = getErrorMessage(error);
        showAlert('farmers-alert', message, 'error');
    }
}

// Edit farmer - load farmer data into form
async function editFarmer(farmerId) {
    try {
        const farmer = await fetchFarmer(farmerId);

        document.getElementById('farmer-first-name').value = farmer.first_name;
        document.getElementById('farmer-last-name').value = farmer.last_name;
        document.getElementById('farmer-email').value = farmer.email || '';
        document.getElementById('farmer-phone').value = farmer.phone || '';
        document.getElementById('farmer-address').value = farmer.address || '';
        document.getElementById('farmer-city').value = farmer.city || '';
        document.getElementById('farmer-state').value = farmer.state || '';
        document.getElementById('farmer-postal').value = farmer.postal_code || '';
        document.getElementById('farmer-country').value = farmer.country || '';
        document.getElementById('farmer-experience').value = farmer.experience_years || 0;

        editingFarmerId = farmerId;
        document.querySelector('#farmers .form-title').textContent = `Edit Farmer - ID: ${farmerId}`;

        // Scroll to form
        document.querySelector('#farmers .form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading farmer:', error);
        showAlert('farmers-alert', 'Error loading farmer', 'error');
    }
}

// Delete farmer with confirmation
async function deleteFarmerConfirm(farmerId) {
    if (!confirmAction('Are you sure you want to delete this farmer? This action cannot be undone.')) {
        return;
    }

    try {
        await deleteFarmer(farmerId);
        showAlert('farmers-alert', 'Farmer deleted successfully!', 'success');
        loadFarmers();
    } catch (error) {
        const message = getErrorMessage(error);
        showAlert('farmers-alert', message, 'error');
    }
}

// Reset farmer form to initial state
function resetFarmerForm() {
    const inputIds = [
        'farmer-first-name',
        'farmer-last-name',
        'farmer-email',
        'farmer-phone',
        'farmer-address',
        'farmer-city',
        'farmer-state',
        'farmer-postal',
        'farmer-country',
        'farmer-experience'
    ];

    clearFormInputs(inputIds);
    editingFarmerId = null;
    document.querySelector('#farmers .form-title').textContent = 'Add/Edit Farmer';
}
