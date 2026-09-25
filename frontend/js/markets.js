// Markets module

let editingMarketId = null;

async function loadMarkets() {
    try {
        const markets = await fetchMarkets();
        updateStatCard('market-count', markets.length);

        const container = document.getElementById('markets-table-container');
        const columns = [
            { key: 'market_id', label: 'ID' },
            { key: 'market_name', label: 'Market Name' },
            { key: 'location', label: 'Location' },
            { key: 'contact_person', label: 'Contact Person' },
            { key: 'phone', label: 'Phone' },
            { key: 'email', label: 'Email' }
        ];

        const actionsHTML = (market) => `
            <div class="action-buttons">
                <button class="btn-edit" onclick="editMarket(${market.market_id})">Edit</button>
                <button class="btn-danger" onclick="deleteMarketConfirm(${market.market_id})">Delete</button>
            </div>
        `;

        container.innerHTML = generateTableHTML(markets, columns, actionsHTML);
    } catch (error) {
        console.error('Error loading markets:', error);
        const container = document.getElementById('markets-table-container');
        if (container) {
            container.innerHTML = '<div class="no-data">No markets available yet.</div>';
        }
        updateStatCard('market-count', 0);
    }
}

async function addOrUpdateMarket() {
    const marketName = document.getElementById('market-name').value.trim();
    if (!marketName) {
        showAlert('markets-alert', 'Market name is required', 'error');
        return;
    }

    const marketData = {
        market_name: marketName,
        location: document.getElementById('market-location').value || null,
        contact_person: document.getElementById('market-contact').value || null,
        phone: document.getElementById('market-phone').value || null,
        email: document.getElementById('market-email').value || null
    };

    try {
        if (editingMarketId) {
            await updateMarket(editingMarketId, marketData);
            showAlert('markets-alert', 'Market updated successfully!', 'success');
        } else {
            await createMarket(marketData);
            showAlert('markets-alert', 'Market added successfully!', 'success');
        }
        resetMarketForm();
        loadMarkets();
    } catch (error) {
        showAlert('markets-alert', getErrorMessage(error), 'error');
    }
}

async function editMarket(marketId) {
    try {
        const market = await fetchMarket(marketId);
        document.getElementById('market-name').value = market.market_name || '';
        document.getElementById('market-location').value = market.location || '';
        document.getElementById('market-contact').value = market.contact_person || '';
        document.getElementById('market-phone').value = market.phone || '';
        document.getElementById('market-email').value = market.email || '';

        editingMarketId = marketId;
        document.querySelector('#markets .form-title').textContent = `Edit Market - ID: ${marketId}`;
        document.querySelector('#markets .form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showAlert('markets-alert', getErrorMessage(error), 'error');
    }
}

async function deleteMarketConfirm(marketId) {
    if (!confirmAction('Are you sure you want to delete this market? This action cannot be undone.')) return;

    try {
        await deleteMarket(marketId);
        showAlert('markets-alert', 'Market deleted successfully!', 'success');
        loadMarkets();
    } catch (error) {
        showAlert('markets-alert', getErrorMessage(error), 'error');
    }
}

function resetMarketForm() {
    clearFormInputs([
        'market-name',
        'market-location',
        'market-contact',
        'market-phone',
        'market-email'
    ]);
    editingMarketId = null;
    document.querySelector('#markets .form-title').textContent = 'Add/Edit Market';
}
