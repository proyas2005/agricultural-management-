let editingFertilizerUsageId = null;


// ==================== LOAD PLANTING RECORD DROPDOWN ====================

async function loadPlantingRecordsForFertilizerUsageDropdown() {
    try {
        const records = await fetchPlantingRecords();

        const select = document.getElementById(
            'fertilizer-usage-planting-id'
        );

        if (!select) return;

        while (select.options.length > 1) {
            select.remove(1);
        }

        records.forEach(record => {
            const option = document.createElement('option');

            option.value = record.planting_id;

            option.textContent =
                `ID ${record.planting_id} - ${record.land_name || 'Land'} - ${record.crop_name || 'Crop'}`;

            select.appendChild(option);
        });

    } catch (error) {
        console.error(
            'Error loading planting records for fertilizer usage:',
            error
        );
    }
}


// ==================== LOAD FERTILIZER DROPDOWN ====================

async function loadFertilizersForUsageDropdown() {
    try {
        const fertilizers = await fetchFertilizers();

        const select = document.getElementById(
            'fertilizer-usage-fertilizer-id'
        );

        if (!select) return;

        while (select.options.length > 1) {
            select.remove(1);
        }

        fertilizers.forEach(fertilizer => {
            const option = document.createElement('option');

            option.value = fertilizer.fertilizer_id;

            option.textContent =
                `${fertilizer.fertilizer_name} (${fertilizer.unit})`;

            select.appendChild(option);
        });

    } catch (error) {
        console.error(
            'Error loading fertilizers for usage:',
            error
        );
    }
}


// ==================== LOAD FERTILIZER USAGE RECORDS ====================

async function loadFertilizerUsages() {
    try {
        const records = await fetchFertilizerUsages();

        updateStatCard(
            'fertilizer-usage-count',
            records.length
        );

        const container = document.getElementById(
            'fertilizer-usage-table-container'
        );

        if (!container) return;

        const columns = [
            {
                key: 'usage_id',
                label: 'ID'
            },
            {
                key: 'farmer_name',
                label: 'Farmer'
            },
            {
                key: 'land_name',
                label: 'Land'
            },
            {
                key: 'crop_name',
                label: 'Crop'
            },
            {
                key: 'planting_id',
                label: 'Planting ID'
            },
            {
                key: 'fertilizer_name',
                label: 'Fertilizer'
            },
            {
                key: 'usage_date',
                label: 'Usage Date',
                formatter: formatDate
            },
            {
                key: 'quantity_used',
                label: 'Quantity',
                formatter: value =>
                    value !== null && value !== undefined
                        ? formatNumber(value)
                        : '-'
            },
            {
                key: 'unit',
                label: 'Unit'
            },
            {
                key: 'cost',
                label: 'Cost',
                formatter: value =>
                    value !== null && value !== undefined
                        ? formatNumber(value)
                        : '-'
            },
            {
                key: 'notes',
                label: 'Notes'
            }
        ];

        const actionsHTML = record => `
            <div class="action-buttons">

                <button
                    class="btn-edit"
                    onclick="editFertilizerUsage(${record.usage_id})">
                    Edit
                </button>

                <button
                    class="btn-danger"
                    onclick="deleteFertilizerUsageConfirm(${record.usage_id})">
                    Delete
                </button>

            </div>
        `;

        container.innerHTML = generateTableHTML(
            records,
            columns,
            actionsHTML
        );

    } catch (error) {
        console.error(
            'Error loading fertilizer usage records:',
            error
        );

        const container = document.getElementById(
            'fertilizer-usage-table-container'
        );

        if (container) {
            container.innerHTML =
                '<div class="no-data">No fertilizer usage records available yet.</div>';
        }

        updateStatCard(
            'fertilizer-usage-count',
            0
        );
    }
}


// ==================== ADD / UPDATE ====================

async function addOrUpdateFertilizerUsage() {

    const plantingId =
        document.getElementById(
            'fertilizer-usage-planting-id'
        ).value;

    const fertilizerId =
        document.getElementById(
            'fertilizer-usage-fertilizer-id'
        ).value;

    const usageDate =
        document.getElementById(
            'fertilizer-usage-date'
        ).value;

    const quantityInput =
        document.getElementById(
            'fertilizer-usage-quantity'
        ).value.trim();

    const unit =
        document.getElementById(
            'fertilizer-usage-unit'
        ).value.trim();

    const costInput =
        document.getElementById(
            'fertilizer-usage-cost'
        ).value.trim();

    const notes =
        document.getElementById(
            'fertilizer-usage-notes'
        ).value.trim();


    if (
        !plantingId ||
        !fertilizerId ||
        !usageDate ||
        !quantityInput ||
        !unit ||
        !costInput
    ) {
        showAlert(
            'fertilizer-usage-alert',
            'Planting record, fertilizer, date, quantity, unit, and cost are required',
            'error'
        );

        return;
    }


    const quantityUsed =
        parseFloat(quantityInput);

    const cost =
        parseFloat(costInput);


    if (
        Number.isNaN(quantityUsed) ||
        quantityUsed <= 0
    ) {
        showAlert(
            'fertilizer-usage-alert',
            'Quantity used must be greater than 0',
            'error'
        );

        return;
    }


    if (
        Number.isNaN(cost) ||
        cost < 0
    ) {
        showAlert(
            'fertilizer-usage-alert',
            'Cost must be a valid non-negative number',
            'error'
        );

        return;
    }


    const data = {
        planting_id: parseInt(
            plantingId,
            10
        ),

        fertilizer_id: parseInt(
            fertilizerId,
            10
        ),

        usage_date: usageDate,

        quantity_used: quantityUsed,

        unit: unit,

        cost: cost,

        notes: notes || ''
    };


    try {

        if (
            editingFertilizerUsageId !== null
        ) {

            await updateFertilizerUsage(
                editingFertilizerUsageId,
                data
            );

            showAlert(
                'fertilizer-usage-alert',
                'Fertilizer usage record updated successfully!',
                'success'
            );

        } else {

            await createFertilizerUsage(
                data
            );

            showAlert(
                'fertilizer-usage-alert',
                'Fertilizer usage record added successfully!',
                'success'
            );
        }


        resetFertilizerUsageForm();

        await loadFertilizerUsages();

    } catch (error) {

        showAlert(
            'fertilizer-usage-alert',
            getErrorMessage(error),
            'error'
        );
    }
}


// ==================== EDIT ====================

async function editFertilizerUsage(
    usageId
) {

    try {

        const record =
            await fetchFertilizerUsage(
                usageId
            );


        document.getElementById(
            'fertilizer-usage-planting-id'
        ).value =
            record.planting_id || '';


        document.getElementById(
            'fertilizer-usage-fertilizer-id'
        ).value =
            record.fertilizer_id || '';




        document.getElementById(
            'fertilizer-usage-date'
        ).value =
            (record.usage_date || '').substring(0, 10);




        document.getElementById(
            'fertilizer-usage-quantity'
        ).value =
            record.quantity_used ?? '';


        document.getElementById(
            'fertilizer-usage-unit'
        ).value =
            record.unit || '';


        document.getElementById(
            'fertilizer-usage-cost'
        ).value =
            record.cost ?? '';


        document.getElementById(
            'fertilizer-usage-notes'
        ).value =
            record.notes || '';


        editingFertilizerUsageId =
            usageId;


        const title =
            document.querySelector(
                '#fertilizer-usage .form-title'
            );

        if (title) {
            title.textContent =
                `Edit Fertilizer Usage - ID: ${usageId}`;
        }


        const formSection =
            document.querySelector(
                '#fertilizer-usage .form-section'
            );

        if (formSection) {

            formSection.scrollIntoView({
                behavior: 'smooth'
            });
        }

    } catch (error) {

        showAlert(
            'fertilizer-usage-alert',
            getErrorMessage(error),
            'error'
        );
    }
}


// ==================== DELETE ====================

async function deleteFertilizerUsageConfirm(
    usageId
) {

    const confirmed =
        confirmAction(
            'Are you sure you want to delete this fertilizer usage record?'
        );

    if (!confirmed) {
        return;
    }


    try {

        await deleteFertilizerUsage(
            usageId
        );

        showAlert(
            'fertilizer-usage-alert',
            'Fertilizer usage record deleted successfully!',
            'success'
        );

        await loadFertilizerUsages();

    } catch (error) {

        showAlert(
            'fertilizer-usage-alert',
            getErrorMessage(error),
            'error'
        );
    }
}


// ==================== RESET FORM ====================

function resetFertilizerUsageForm() {

    clearFormInputs([
        'fertilizer-usage-planting-id',
        'fertilizer-usage-fertilizer-id',
        'fertilizer-usage-date',
        'fertilizer-usage-quantity',
        'fertilizer-usage-unit',
        'fertilizer-usage-cost',
        'fertilizer-usage-notes'
    ]);


    editingFertilizerUsageId = null;


    const title =
        document.querySelector(
            '#fertilizer-usage .form-title'
        );

    if (title) {
        title.textContent =
            'Add/Edit Fertilizer Usage';
    }
}