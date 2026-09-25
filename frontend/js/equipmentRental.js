let editingEquipmentRentalId = null;

// Load all equipment rental records
async function loadEquipmentRentals() {
    try {
        const rentals = await fetchEquipmentRentals();

        updateStatCard('equipment-rental-count', rentals.length);

        const container = document.getElementById('equipment-rental-table-container');

        if (!container) {
            return;
        }

        const columns = [
            { key: 'rental_id', label: 'ID' },
            { key: 'farmer_name', label: 'Farmer' },
            { key: 'equipment_name', label: 'Equipment' },
            { key: 'rental_date', label: 'Rental Date' },
            { key: 'return_date', label: 'Return Date' },
            { key: 'rental_days', label: 'Days' },
            { key: 'rental_cost', label: 'Cost' },
            { key: 'status', label: 'Status' },
            { key: 'notes', label: 'Notes' }
        ];

        const actionsHTML = (rental) => {
            return `
                <div class="action-buttons">
                    <button
                        class="btn-edit"
                        onclick="editEquipmentRental(${rental.rental_id})">
                        Edit
                    </button>

                    <button
                        class="btn-danger"
                        onclick="deleteEquipmentRentalConfirm(${rental.rental_id})">
                        Delete
                    </button>
                </div>
            `;
        };

        container.innerHTML = generateTableHTML(
            rentals,
            columns,
            actionsHTML
        );

    } catch (error) {
        console.error('Error loading equipment rentals:', error);

        const container = document.getElementById(
            'equipment-rental-table-container'
        );

        if (container) {
            container.innerHTML =
                '<div class="no-data">No equipment rental records available yet.</div>';
        }

        updateStatCard('equipment-rental-count', 0);
    }
}


// Load farmers into dropdown
async function loadEquipmentRentalFarmers() {
    try {
        const farmers = await fetchFarmers();
        const select = document.getElementById('rental-farmer-id');

        if (!select) {
            return;
        }

        select.innerHTML =
            '<option value="">Select Farmer</option>';

        farmers.forEach(farmer => {
            const option = document.createElement('option');

            option.value = farmer.farmer_id;
            option.textContent =
                `${farmer.first_name} ${farmer.last_name}`;

            select.appendChild(option);
        });

    } catch (error) {
        console.error('Error loading farmers for equipment rental:', error);
    }
}


// Load equipment into dropdown
async function loadEquipmentRentalEquipment() {
    try {
        const equipment = await fetchEquipment();
        const select = document.getElementById('rental-equipment-id');

        if (!select) {
            return;
        }

        select.innerHTML =
            '<option value="">Select Equipment</option>';

        equipment.forEach(item => {
            const option = document.createElement('option');

            option.value = item.equipment_id;
            option.textContent = item.equipment_name;

            select.appendChild(option);
        });

    } catch (error) {
        console.error('Error loading equipment for equipment rental:', error);
    }
}


// Load everything required for Equipment Rental
async function initializeEquipmentRental() {
    await Promise.all([
        loadEquipmentRentalFarmers(),
        loadEquipmentRentalEquipment()
    ]);

    await loadEquipmentRentals();
}


// Add or update rental
async function addOrUpdateEquipmentRental() {
    const farmerId = document.getElementById('rental-farmer-id').value;
    const equipmentId = document.getElementById('rental-equipment-id').value;
    const rentalDate = document.getElementById('rental-date').value;
    const returnDate = document.getElementById('rental-return-date').value;
    const rentalDays = document.getElementById('rental-days').value;
    const rentalCost = document.getElementById('rental-cost').value;
    const status = document.getElementById('rental-status').value;
    const notes = document.getElementById('rental-notes').value;

    if (!farmerId) {
        showAlert(
            'equipment-rental-alert',
            'Please select a farmer',
            'error'
        );
        return;
    }

    if (!equipmentId) {
        showAlert(
            'equipment-rental-alert',
            'Please select equipment',
            'error'
        );
        return;
    }

    if (!rentalDate) {
        showAlert(
            'equipment-rental-alert',
            'Rental date is required',
            'error'
        );
        return;
    }

    if (!rentalDays || Number(rentalDays) <= 0) {
        showAlert(
            'equipment-rental-alert',
            'Rental days must be greater than 0',
            'error'
        );
        return;
    }

    if (rentalCost === '' || Number(rentalCost) < 0) {
        showAlert(
            'equipment-rental-alert',
            'Rental cost cannot be negative or empty',
            'error'
        );
        return;
    }

    if (returnDate && returnDate < rentalDate) {
        showAlert(
            'equipment-rental-alert',
            'Return date cannot be before rental date',
            'error'
        );
        return;
    }

    const rentalData = {
        farmer_id: Number(farmerId),
        equipment_id: Number(equipmentId),
        rental_date: rentalDate,
        return_date: returnDate || null,
        rental_days: Number(rentalDays),
        rental_cost: Number(rentalCost),
        status: status || 'Requested',
        notes: notes || null
    };

    try {
        if (editingEquipmentRentalId) {
            await updateEquipmentRental(
                editingEquipmentRentalId,
                rentalData
            );

            showAlert(
                'equipment-rental-alert',
                'Equipment rental updated successfully!',
                'success'
            );
        } else {
            await createEquipmentRental(rentalData);

            showAlert(
                'equipment-rental-alert',
                'Equipment rental added successfully!',
                'success'
            );
        }

        resetEquipmentRentalForm();
        await loadEquipmentRentals();

    } catch (error) {
        console.error('Error saving equipment rental:', error);

        showAlert(
            'equipment-rental-alert',
            getErrorMessage(error),
            'error'
        );
    }
}


// Edit equipment rental
async function editEquipmentRental(rentalId) {
    try {
        const rental = await fetchEquipmentRental(rentalId);

        document.getElementById('rental-farmer-id').value =
            rental.farmer_id;

        document.getElementById('rental-equipment-id').value =
            rental.equipment_id;


            

        document.getElementById('rental-date').value =
            (rental.rental_date || '').substring(0, 10);

        document.getElementById('rental-return-date').value =
            (rental.return_date || '').substring(0, 10);




        document.getElementById('rental-days').value =
            rental.rental_days ?? '';

        document.getElementById('rental-cost').value =
            rental.rental_cost ?? '';

        document.getElementById('rental-status').value =
            rental.status || 'Requested';

        document.getElementById('rental-notes').value =
            rental.notes || '';

        editingEquipmentRentalId = rentalId;

        const title = document.querySelector(
            '#equipment-rental .form-title'
        );

        if (title) {
            title.textContent = 'Edit Equipment Rental';
        }

    } catch (error) {
        console.error('Error loading equipment rental:', error);

        showAlert(
            'equipment-rental-alert',
            getErrorMessage(error),
            'error'
        );
    }
}


// Delete confirmation
function deleteEquipmentRentalConfirm(rentalId) {
    if (
        confirm(
            'Are you sure you want to delete this equipment rental?'
        )
    ) {
        deleteEquipmentRentalRecord(rentalId);
    }
}


// Delete equipment rental
async function deleteEquipmentRentalRecord(rentalId) {
    try {
        await deleteEquipmentRental(rentalId);

        showAlert(
            'equipment-rental-alert',
            'Equipment rental deleted successfully!',
            'success'
        );

        await loadEquipmentRentals();

    } catch (error) {
        console.error('Error deleting equipment rental:', error);

        showAlert(
            'equipment-rental-alert',
            getErrorMessage(error),
            'error'
        );
    }
}


// Reset Equipment Rental form
function resetEquipmentRentalForm() {
    const inputIds = [
        'rental-farmer-id',
        'rental-equipment-id',
        'rental-date',
        'rental-return-date',
        'rental-days',
        'rental-cost',
        'rental-notes'
    ];

    clearFormInputs(inputIds);

    const statusSelect = document.getElementById('rental-status');

    if (statusSelect) {
        statusSelect.value = 'Requested';
    }

    editingEquipmentRentalId = null;

    const title = document.querySelector(
        '#equipment-rental .form-title'
    );

    if (title) {
        title.textContent = 'Add/Edit Equipment Rental';
    }
}