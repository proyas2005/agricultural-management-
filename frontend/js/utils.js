// Utility functions

// Display alert message
// @param {string} containerId - ID of the alert container
// @param {string} message - Alert message
// @param {string} type - Alert type (success, error, info)
function showAlert(containerId, message, type) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container with id ${containerId} not found`);
        return;
    }

    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;

    // Auto-hide alert after 5 seconds
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// Switch between tabs
// @param {string} tabName - Name of the tab to switch to
function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.nav-tab');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Set active button
    event.target.classList.add('active');

    // Load data for the tab
    if (tabName === 'farmers') {
        loadFarmers();
    } else if (tabName === 'crops') {
        loadCrops();
    } else if (tabName === 'land') {
        loadFarmersForLandDropdown();
        loadLand();
    } else if (tabName === 'equipment') {
        loadEquipment();
    } else if (tabName === 'markets') {
        loadMarkets();
    } else if (tabName === 'planting-records') {
        loadLandForPlantingRecordsDropdown();
        loadCropsForPlantingRecordsDropdown();
        loadPlantingRecords();
    } else if (tabName === 'harvest') {
        loadPlantingRecordsForHarvestDropdown();
        loadHarvests();
    } else if (tabName === 'sales') {
        loadHarvestsForSalesDropdown();
        loadMarketsForSalesDropdown();
        loadSales();
        } else if (tabName === 'weather') {
        loadLandForWeatherDropdown();
        loadWeather();
    } else if (tabName === 'equipment-rental') {
        loadEquipmentRentalFarmers();
        loadEquipmentRentalEquipment();
        loadEquipmentRentals();
    } else if (tabName === 'fertilizers') {
        loadFertilizers();
    } else if (tabName === 'fertilizer-usage') {
        loadPlantingRecordsForFertilizerUsageDropdown();
        loadFertilizersForUsageDropdown();
        loadFertilizerUsages();
    } else if (tabName === 'profit-calculation') {
        loadProfitFarmers();
        loadProfitCalculations();
    } else if (tabName === 'reports') {
        resetReportView();
    }
}



// Format a number with 2 decimal places
// @param {number} num - Number to format
// @returns {string} Formatted number
function formatNumber(num) {
    if (!num && num !== 0) return '-';
    return parseFloat(num).toFixed(2);
}

// Format a date string
// @param {string} dateStr - Date string to format
// @returns {string} Formatted date
function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Validate email format
// @param {string} email - Email to validate
// @returns {boolean} True if valid, false otherwise
function isValidEmail(email) {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate required fields
// @param {Object} data - Object with data to validate
// @param {Array} requiredFields - Array of required field names
// @returns {Object} { isValid: boolean, message: string }
function validateRequired(data, requiredFields) {
    for (let field of requiredFields) {
        if (!data[field] && data[field] !== 0) {
            return {
                isValid: false,
                message: `${field.replace(/_/g, ' ')} is required`
            };
        }
    }
    return { isValid: true };
}

// Update stat card with count
// @param {string} elementId - ID of the stat number element
// @param {number} count - Count to display
function updateStatCard(elementId, count) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = count;
    }
}

// Clear all inputs in a form section
// @param {Array} inputIds - Array of input element IDs to clear
function clearFormInputs(inputIds) {
    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.type === 'checkbox' || element.type === 'radio') {
                element.checked = false;
            } else {
                element.value = '';
            }
        }
    });
}

// Get values from form inputs
// @param {Array} inputIds - Array of input element IDs
// @returns {Object} Object with input values
function getFormValues(inputIds) {
    const values = {};
    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            values[id] = element.value || '';
        }
    });
    return values;
}

// Set values to form inputs
// @param {Object} values - Object with values to set
function setFormValues(values) {
    Object.keys(values).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = values[id] || '';
        }
    });
}

// Confirm action with user
// @param {string} message - Confirmation message
// @returns {boolean} True if confirmed, false otherwise
function confirmAction(message) {
    return confirm(message);
}



















// Generate table HTML from data array
// @param {Array} data - Array of objects
// @param {Array} columns - Array of column configuration objects
// @param {Function} actionsCallback - Function to render actions column
// @returns {string} HTML table string




function generateTableHTML(data, columns, actionsCallback) {
    if (!data || data.length === 0) {
        return '<div class="no-data">No records found. Add one to get started!</div>';
    }

    let html = '<table><thead><tr>';

    // Header
    columns.forEach(col => {
        html += `<th>${col.label}</th>`;
    });

    // Only add the Actions header if we have an actions callback
    if (actionsCallback) {
        html += '<th>Actions</th>';
    }

    html += '</tr></thead><tbody>';

    // Rows
    data.forEach(item => {
        html += '<tr>';
        columns.forEach(col => {
            let cellValue = item[col.key];

            // Apply formatter if provided
            if (col.formatter) {
                cellValue = col.formatter(cellValue, item);
            }

            // Show '-' only for null/undefined/empty, not for 0
            if (cellValue === null || cellValue === undefined || cellValue === '') {
                cellValue = '-';
            }

            html += `<td>${cellValue}</td>`;
        });

        // Actions column
        if (actionsCallback) {
            html += `<td>${actionsCallback(item)}</td>`;
        }
        html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
}




















// Handle API errors with appropriate messages
// @param {Error} error - The error object
// @returns {string} User-friendly error message
function getErrorMessage(error) {
    if (typeof error === 'string') {
        return error;
    }

    if (error.message) {
        // Handle specific error messages
        if (error.message.includes('Email already exists')) {
            return 'This email is already in use. Please use a different email.';
        }
        return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
}
