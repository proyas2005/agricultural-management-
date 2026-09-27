// Weather module

let editingWeatherId = null;

async function loadLandForWeatherDropdown() {
    try {
        const lands = await fetchLand();
        const select = document.getElementById('weather-land-id');
        while (select.options.length > 1) select.remove(1);

        lands.forEach(land => {
            const option = document.createElement('option');
            option.value = land.land_id;
            option.textContent = `${land.land_name || 'Land'} (${land.area || 0} ${land.area_unit || 'ha'})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading weather land dropdown:', error);
    }
}

async function loadWeather() {
    try {
        const weatherData = await fetchWeather();
        updateStatCard('weather-count', weatherData.length);

        const container = document.getElementById('weather-table-container');
        const columns = [
            { key: 'weather_id', label: 'ID' },
            { key: 'land_name', label: 'Land' },
            { key: 'weather_date', label: 'Date', formatter: formatDate },
            { key: 'temperature_min', label: 'Min Temp', formatter: value => value ? formatNumber(value) : '-' },
            { key: 'temperature_max', label: 'Max Temp', formatter: value => value ? formatNumber(value) : '-' },
            { key: 'rainfall', label: 'Rainfall', formatter: value => value ? formatNumber(value) : '-' },
            { key: 'humidity', label: 'Humidity', formatter: value => value ? formatNumber(value) : '-' }
        ];

        const actionsHTML = (item) => `
            <div class="action-buttons">
                <button class="btn-edit" onclick="editWeather(${item.weather_id})">Edit</button>
                <button class="btn-danger" onclick="deleteWeatherConfirm(${item.weather_id})">Delete</button>
            </div>
        `;

        container.innerHTML = generateTableHTML(weatherData, columns, actionsHTML);
    } catch (error) {
        console.error('Error loading weather:', error);
        const container = document.getElementById('weather-table-container');
        if (container) {
            container.innerHTML = '<div class="no-data">No weather records available yet.</div>';
        }
        updateStatCard('weather-count', 0);
    }
}

async function addOrUpdateWeather() {
    const landId = document.getElementById('weather-land-id').value;
    const weatherDate = document.getElementById('weather-date').value;

    if (!landId || !weatherDate) {
        showAlert('weather-alert', 'Land and weather date are required', 'error');
        return;
    }

    const weatherData = {
        land_id: parseInt(landId),
        weather_date: weatherDate,
        temperature_min: document.getElementById('weather-min-temp').value || null,
        temperature_max: document.getElementById('weather-max-temp').value || null,
        rainfall: document.getElementById('weather-rainfall').value || null,
        humidity: document.getElementById('weather-humidity').value || null,
        wind_speed: document.getElementById('weather-wind-speed').value || null,
        notes: document.getElementById('weather-notes').value || null
    };

    try {
        if (editingWeatherId) {
            await updateWeather(editingWeatherId, weatherData);
            showAlert('weather-alert', 'Weather record updated successfully!', 'success');
        } else {
            await createWeather(weatherData);
            showAlert('weather-alert', 'Weather record added successfully!', 'success');
        }
        resetWeatherForm();
        loadWeather();
    } catch (error) {
        showAlert('weather-alert', getErrorMessage(error), 'error');
    }
}

async function editWeather(weatherId) {
    try {
        const weatherData = await fetchWeather();
        const item = weatherData.find(entry => entry.weather_id === weatherId);
        if (!item) return;


        document.getElementById('weather-land-id').value = item.land_id;

        
        document.getElementById('weather-date').value = (item.weather_date || '').substring(0, 10);

        document.getElementById('weather-min-temp').value = item.temperature_min || '';
        document.getElementById('weather-max-temp').value = item.temperature_max || '';
        document.getElementById('weather-rainfall').value = item.rainfall || '';
        document.getElementById('weather-humidity').value = item.humidity || '';
        document.getElementById('weather-wind-speed').value = item.wind_speed || '';
        document.getElementById('weather-notes').value = item.notes || '';


        editingWeatherId = weatherId;
        document.querySelector('#weather .form-title').textContent = `Edit Weather Record - ID: ${weatherId}`;
        document.querySelector('#weather .form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showAlert('weather-alert', getErrorMessage(error), 'error');
    }
}

async function deleteWeatherConfirm(weatherId) {
    if (!confirmAction('Are you sure you want to delete this weather record?')) return;

    try {
        await deleteWeather(weatherId);
        showAlert('weather-alert', 'Weather record deleted successfully!', 'success');
        loadWeather();
    } catch (error) {
        showAlert('weather-alert', getErrorMessage(error), 'error');
    }
}

function resetWeatherForm() {
    clearFormInputs([
        'weather-land-id',
        'weather-date',
        'weather-min-temp',
        'weather-max-temp',
        'weather-rainfall',
        'weather-humidity',
        'weather-wind-speed',
        'weather-notes'
    ]);
    editingWeatherId = null;
    document.querySelector('#weather .form-title').textContent = 'Add/Edit Weather Record';
}
