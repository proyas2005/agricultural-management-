// ============================================================
// Profit Calculation - frontend logic
// ============================================================

let editingProfitId = null;


// ---------- Load all profit records ----------
async function loadProfitCalculations() {
    try {
        const records = await fetchProfitCalculations();

        updateStatCard('profit-count', records.length);

        const container = document.getElementById(
            'profit-table-container'
        );

        if (!container) return;

        const columns = [
            { key: 'profit_id', label: 'ID' },
            { key: 'farmer_name', label: 'Farmer' },
            { key: 'calculation_date', label: 'Date' },
            { key: 'total_revenue', label: 'Revenue' },
            { key: 'total_cost', label: 'Total Cost' },
            { key: 'net_profit', label: 'Net Profit' },
            { key: 'notes', label: 'Notes' }
        ];

        const actionsHTML = (record) => {
            return `
                <div class="action-buttons">
                    <button
                        class="btn-edit"
                        onclick="editProfitCalculation(${record.profit_id})">
                        Edit
                    </button>

                    <button
                        class="btn-danger"
                        onclick="deleteProfitCalculationConfirm(${record.profit_id})">
                        Delete
                    </button>
                </div>
            `;
        };

        container.innerHTML = generateTableHTML(
            records,
            columns,
            actionsHTML
        );

    } catch (error) {
        console.error('Error loading profit calculations:', error);

        const container = document.getElementById(
            'profit-table-container'
        );
        if (container) {
            container.innerHTML =
                '<div class="no-data">No profit records available yet.</div>';
        }
        updateStatCard('profit-count', 0);
    }
}


// ---------- Load farmers into the dropdown ----------
async function loadProfitFarmers() {
    try {
        const farmers = await fetchFarmers();
        const select = document.getElementById('profit-farmer-id');

        if (!select) return;

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
        console.error('Error loading farmers for profit:', error);
    }
}


// ---------- Save (create or update) ----------
async function addOrUpdateProfitCalculation() {
    const farmerId = document.getElementById('profit-farmer-id').value;
    const calculationDate = document.getElementById('profit-date').value;
    const totalRevenue = document.getElementById('profit-revenue').value;
    const fertilizerCost = document.getElementById('profit-fertilizer-cost').value || 0;
    const rentalCost = document.getElementById('profit-rental-cost').value || 0;
    const otherCost = document.getElementById('profit-other-cost').value || 0;
    const notes = document.getElementById('profit-notes').value.trim();

    if (!farmerId || !calculationDate || !totalRevenue) {
        
        showAlert('profit-alert', 'Please fill in Farmer, Date, and Total Revenue.', 'error');

        return;
    }

    const data = {
        farmer_id: Number(farmerId),
        calculation_date: calculationDate,
        total_revenue: Number(totalRevenue),
        fertilizer_cost: Number(fertilizerCost),
        equipment_rental_cost: Number(rentalCost),
        other_cost: Number(otherCost),
        notes: notes
    };

    try {
        if (editingProfitId) {
            await updateProfitCalculation(editingProfitId, data);
            
            showAlert('profit-alert', 'Profit record updated successfully.', 'success');

        } else {
            await createProfitCalculation(data);
            
            showAlert('profit-alert', 'Profit record added successfully.', 'success');

        }

        resetProfitCalculationForm();
        await loadProfitCalculations();

    } catch (error) {
        console.error('Error saving profit record:', error);
        
        showAlert('profit-alert', error.message, 'error');

    }
}


// ---------- Reset form ----------
function resetProfitCalculationForm() {
    editingProfitId = null;

    document.getElementById('profit-farmer-id').value = '';
    document.getElementById('profit-date').value = '';
    document.getElementById('profit-revenue').value = '';
    document.getElementById('profit-fertilizer-cost').value = '';
    document.getElementById('profit-rental-cost').value = '';
    document.getElementById('profit-other-cost').value = '';
    document.getElementById('profit-notes').value = '';

    const button = document.getElementById('profit-submit-button');
    if (button) {
        button.textContent = 'Save Profit Record';
    }
}


// ---------- Edit ----------
async function editProfitCalculation(id) {
    try {
        const record = await fetchProfitCalculation(id);

        editingProfitId = record.profit_id;

        document.getElementById('profit-farmer-id').value =
            record.farmer_id || '';
        document.getElementById('profit-date').value =
            (record.calculation_date || '').substring(0, 10);
        document.getElementById('profit-revenue').value =
            record.total_revenue || '';
        document.getElementById('profit-fertilizer-cost').value =
            record.fertilizer_cost || '';
        document.getElementById('profit-rental-cost').value =
            record.equipment_rental_cost || '';
        document.getElementById('profit-other-cost').value =
            record.other_cost || '';
        document.getElementById('profit-notes').value =
            record.notes || '';

        const button = document.getElementById('profit-submit-button');
        if (button) {
            button.textContent = 'Update Profit Record';
        }

    } catch (error) {
        console.error('Error loading profit record:', error);
        
        showAlert('profit-alert', error.message, 'error');

    }
}


// ---------- Delete ----------
async function deleteProfitCalculationConfirm(id) {
    if (!confirm('Are you sure you want to delete this profit record?')) {
        return;
    }

    try {
        await deleteProfitCalculation(id);
        
        showAlert('profit-alert', 'Profit record deleted successfully.', 'success');

        await loadProfitCalculations();

    } catch (error) {
        console.error('Error deleting profit record:', error);
        
        showAlert('profit-alert', error.message, 'error');

    }
}