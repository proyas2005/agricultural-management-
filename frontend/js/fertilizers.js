let editingFertilizerId = null;

async function loadFertilizers() {
    try {
        const fertilizers = await fetchFertilizers();

        const countElement =
            document.getElementById('fertilizer-count');

        const tableContainer =
            document.getElementById('fertilizer-table-container');

        if (countElement) {
            countElement.textContent = fertilizers.length;
        }

        if (!tableContainer) {
            return;
        }

        if (fertilizers.length === 0) {
            tableContainer.innerHTML =
                '<p class="empty-message">No fertilizers found.</p>';
            return;
        }

        let html = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fertilizer Name</th>
                        <th>Type</th>
                        <th>Unit</th>
                        <th>Price / Unit</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        fertilizers.forEach(fertilizer => {
            html += `
                <tr>
                    <td>${fertilizer.fertilizer_id}</td>
                    <td>${fertilizer.fertilizer_name}</td>
                    <td>${fertilizer.fertilizer_type || ''}</td>
                    <td>${fertilizer.unit}</td>
                    <td>${fertilizer.price_per_unit}</td>
                    <td>${fertilizer.description || ''}</td>
                    <td>
                        <button
                            class="btn btn-edit"
                            onclick="editFertilizer(${fertilizer.fertilizer_id})">
                            Edit
                        </button>

                        <button
                            class="btn btn-danger"
                            onclick="deleteFertilizerConfirm(${fertilizer.fertilizer_id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        tableContainer.innerHTML = html;

    } catch (error) {
        console.error('Error loading fertilizers:', error);
    }
}

async function addOrUpdateFertilizer() {
    const fertilizerName =
        document.getElementById('fertilizer-name').value.trim();

    const fertilizerType =
        document.getElementById('fertilizer-type').value.trim();

    const unit =
        document.getElementById('fertilizer-unit').value.trim();

    const pricePerUnit =
        document.getElementById('fertilizer-price').value;

    const description =
        document.getElementById('fertilizer-description').value.trim();

    if (!fertilizerName || !unit || !pricePerUnit) {
        showAlert('fertilizers-alert', 'Please fill in all required fields.', 'error');
        return;
    }

    const data = {
        fertilizer_name: fertilizerName,
        fertilizer_type: fertilizerType,
        unit: unit,
        price_per_unit: Number(pricePerUnit),
        description: description
    };

    try {
        if (editingFertilizerId) {
            await updateFertilizer(
                editingFertilizerId,
                data
            );

            showAlert('fertilizers-alert', 'Fertilizer updated successfully.', 'success');

        } else {
            await createFertilizer(data);

            showAlert('fertilizers-alert', 'Fertilizer added successfully.', 'success');
        }

        resetFertilizerForm();
        await loadFertilizers();

    } catch (error) {
        console.error('Error saving fertilizer:', error);
        showAlert('fertilizers-alert', error.message, 'error');
    }
}

function resetFertilizerForm() {
    editingFertilizerId = null;

    document.getElementById('fertilizer-name').value = '';
    document.getElementById('fertilizer-type').value = '';
    document.getElementById('fertilizer-unit').value = '';
    document.getElementById('fertilizer-price').value = '';
    document.getElementById('fertilizer-description').value = '';

    const button =
        document.getElementById('fertilizer-submit-button');

    if (button) {
        button.textContent = 'Add Fertilizer';
    }
}

async function editFertilizer(id) {
    try {
        const fertilizer =
            await fetchFertilizer(id);

        editingFertilizerId =
            fertilizer.fertilizer_id;

        document.getElementById('fertilizer-name').value =
            fertilizer.fertilizer_name || '';

        document.getElementById('fertilizer-type').value =
            fertilizer.fertilizer_type || '';

        document.getElementById('fertilizer-unit').value =
            fertilizer.unit || '';

        document.getElementById('fertilizer-price').value =
            fertilizer.price_per_unit || '';

        document.getElementById('fertilizer-description').value =
            fertilizer.description || '';

        const button =
            document.getElementById('fertilizer-submit-button');

        if (button) {
            button.textContent = 'Update Fertilizer';
        }

    } catch (error) {
        console.error('Error loading fertilizer:', error);
        showAlert('fertilizers-alert', error.message, 'error');
    }
}

async function deleteFertilizerConfirm(id) {
    const confirmed =
        confirm('Are you sure you want to delete this fertilizer?');

    if (!confirmed) {
        return;
    }

    try {
        await deleteFertilizer(id);

        showAlert('fertilizers-alert', 'Fertilizer deleted successfully.', 'success');

        await loadFertilizers();

    } catch (error) {
        console.error('Error deleting fertilizer:', error);
        showAlert('fertilizers-alert', error.message, 'error');
    }
}