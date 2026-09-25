// Equipment module

let editingEquipmentId = null;

async function loadEquipment() {
    try {
        const equipment = await fetchEquipment();
        updateStatCard('equipment-count', equipment.length);

        const columns = [
            { key: 'equipment_id', label: 'ID' },
            { key: 'equipment_name', label: 'Name' },
            { key: 'equipment_type', label: 'Type' },
            { key: 'owner_name', label: 'Owner' },
            {
                key: 'rental_price_per_day',
                label: 'Rental Price/Day',
                formatter: value => value ? `${formatNumber(value)}` : '-'
            },
            {
                key: 'availability',
                label: 'Availability',
                formatter: value => value ? 'Available' : 'Unavailable'
            }
        ];

        const actionsHTML = equipmentItem => `
            <div class="action-buttons">
                <button class="btn-edit" onclick="editEquipment(${equipmentItem.equipment_id})">Edit</button>
                <button class="btn-danger" onclick="deleteEquipmentConfirm(${equipmentItem.equipment_id})">Delete</button>
            </div>
        `;

        document.getElementById('equipment-table-container').innerHTML = generateTableHTML(equipment, columns, actionsHTML);
    } catch (error) {
        console.error('Error loading equipment:', error);
        document.getElementById('equipment-table-container').innerHTML = '<div class="no-data">No equipment records available yet.</div>';
        updateStatCard('equipment-count', 0);
    }
}

async function addOrUpdateEquipment() {
    const equipmentName = document.getElementById('equipment-name').value.trim();
    if (!equipmentName) {
        showAlert('equipment-alert', 'Equipment name is required', 'error');
        return;
    }

    const equipmentData = {
        equipment_name: equipmentName,
        equipment_type: document.getElementById('equipment-type').value || null,
        owner_name: document.getElementById('equipment-owner').value || null,
        rental_price_per_day: document.getElementById('equipment-price').value || null,
        description: document.getElementById('equipment-description').value || null,
        availability: document.getElementById('equipment-availability').checked
    };

    try {
        if (editingEquipmentId) {
            await updateEquipment(editingEquipmentId, equipmentData);
            showAlert('equipment-alert', 'Equipment updated successfully!', 'success');
        } else {
            await createEquipment(equipmentData);
            showAlert('equipment-alert', 'Equipment added successfully!', 'success');
        }
        resetEquipmentForm();
        loadEquipment();
    } catch (error) {
        showAlert('equipment-alert', getErrorMessage(error), 'error');
    }
}

async function editEquipment(equipmentId) {
    try {
        const equipment = await fetchEquipment();
        const equipmentItem = equipment.find(item => item.equipment_id === equipmentId);
        if (!equipmentItem) return;

        document.getElementById('equipment-name').value = equipmentItem.equipment_name || '';
        document.getElementById('equipment-type').value = equipmentItem.equipment_type || '';
        document.getElementById('equipment-owner').value = equipmentItem.owner_name || '';
        document.getElementById('equipment-price').value = equipmentItem.rental_price_per_day || '';
        document.getElementById('equipment-description').value = equipmentItem.description || '';
        document.getElementById('equipment-availability').checked = Boolean(equipmentItem.availability);
        editingEquipmentId = equipmentId;
        document.querySelector('#equipment .form-title').textContent = `Edit Equipment - ID: ${equipmentId}`;
        document.querySelector('#equipment .form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showAlert('equipment-alert', getErrorMessage(error), 'error');
    }
}

async function deleteEquipmentConfirm(equipmentId) {
    if (!confirmAction('Are you sure you want to delete this equipment? This action cannot be undone.')) return;

    try {
        await deleteEquipment(equipmentId);
        showAlert('equipment-alert', 'Equipment deleted successfully!', 'success');
        loadEquipment();
    } catch (error) {
        showAlert('equipment-alert', getErrorMessage(error), 'error');
    }
}

function resetEquipmentForm() {
    clearFormInputs([
        'equipment-name',
        'equipment-type',
        'equipment-owner',
        'equipment-price',
        'equipment-description'
    ]);
    document.getElementById('equipment-availability').checked = true;
    editingEquipmentId = null;
    document.querySelector('#equipment .form-title').textContent = 'Add/Edit Equipment';
}
