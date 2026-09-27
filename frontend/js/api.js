// API Base URL
const API_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port || '3002'}/api`;

// Farmers API calls

async function fetchFarmers() {
    try {
        const response = await fetch(`${API_URL}/farmers`);
        if (!response.ok) throw new Error('Failed to fetch farmers');
        return await response.json();
    } catch (error) {
        console.error('Error fetching farmers:', error);
        throw error;
    }
}

async function fetchFarmer(farmerId) {
    try {
        const response = await fetch(`${API_URL}/farmers/${farmerId}`);
        if (!response.ok) throw new Error('Farmer not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching farmer:', error);
        throw error;
    }
}

async function createFarmer(farmerData) {
    try {
        const response = await fetch(`${API_URL}/farmers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(farmerData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create farmer');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating farmer:', error);
        throw error;
    }
}

async function updateFarmer(farmerId, farmerData) {
    try {
        const response = await fetch(`${API_URL}/farmers/${farmerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(farmerData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update farmer');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating farmer:', error);
        throw error;
    }
}

async function deleteFarmer(farmerId) {
    try {
        const response = await fetch(`${API_URL}/farmers/${farmerId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete farmer');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting farmer:', error);
        throw error;
    }
}

// Crops API calls

async function fetchCrops() {
    try {
        const response = await fetch(`${API_URL}/crops`);
        if (!response.ok) throw new Error('Failed to fetch crops');
        return await response.json();
    } catch (error) {
        console.error('Error fetching crops:', error);
        throw error;
    }
}

async function fetchCrop(cropId) {
    try {
        const response = await fetch(`${API_URL}/crops/${cropId}`);
        if (!response.ok) throw new Error('Crop not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching crop:', error);
        throw error;
    }
}

async function createCrop(cropData) {
    try {
        const response = await fetch(`${API_URL}/crops`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cropData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create crop');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating crop:', error);
        throw error;
    }
}

async function updateCrop(cropId, cropData) {
    try {
        const response = await fetch(`${API_URL}/crops/${cropId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cropData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update crop');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating crop:', error);
        throw error;
    }
}

async function deleteCrop(cropId) {
    try {
        const response = await fetch(`${API_URL}/crops/${cropId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete crop');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting crop:', error);
        throw error;
    }
}

// Land API calls

async function fetchLand() {
    try {
        const response = await fetch(`${API_URL}/land`);
        if (!response.ok) throw new Error('Failed to fetch land');
        return await response.json();
    } catch (error) {
        console.error('Error fetching land:', error);
        throw error;
    }
}

async function createLand(landData) {
    try {
        const response = await fetch(`${API_URL}/land`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(landData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create land');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating land:', error);
        throw error;
    }
}

async function updateLand(landId, landData) {
    try {
        const response = await fetch(`${API_URL}/land/${landId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(landData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update land');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating land:', error);
        throw error;
    }
}

async function deleteLand(landId) {
    try {
        const response = await fetch(`${API_URL}/land/${landId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete land');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting land:', error);
        throw error;
    }
}

// Markets API calls

async function fetchMarkets() {
    const response = await fetch(`${API_URL}/markets`);
    if (!response.ok) throw new Error('Failed to fetch markets');
    return await response.json();
}

async function fetchMarket(marketId) {
    const response = await fetch(`${API_URL}/markets/${marketId}`);
    if (!response.ok) throw new Error('Market not found');
    return await response.json();
}

async function createMarket(marketData) {
    const response = await fetch(`${API_URL}/markets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(marketData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create market');
    }
    return await response.json();
}

async function updateMarket(marketId, marketData) {
    const response = await fetch(`${API_URL}/markets/${marketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(marketData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update market');
    }
    return await response.json();
}

async function deleteMarket(marketId) {
    const response = await fetch(`${API_URL}/markets/${marketId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete market');
    }
    return await response.json();
}

// Planting records API calls

async function fetchPlantingRecords() {
    const response = await fetch(`${API_URL}/planting-records`);
    if (!response.ok) throw new Error('Failed to fetch planting records');
    return await response.json();
}

async function createPlantingRecord(recordData) {
    const response = await fetch(`${API_URL}/planting-records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create planting record');
    }
    return await response.json();
}

async function updatePlantingRecord(recordId, recordData) {
    const response = await fetch(`${API_URL}/planting-records/${recordId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update planting record');
    }
    return await response.json();
}

async function deletePlantingRecord(recordId) {
    const response = await fetch(`${API_URL}/planting-records/${recordId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete planting record');
    }
    return await response.json();
}

// Harvest API calls

async function fetchHarvests() {
    const response = await fetch(`${API_URL}/harvest`);
    if (!response.ok) throw new Error('Failed to fetch harvests');
    return await response.json();
}

async function createHarvest(harvestData) {
    const response = await fetch(`${API_URL}/harvest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(harvestData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create harvest');
    }
    return await response.json();
}

async function updateHarvest(harvestId, harvestData) {
    const response = await fetch(`${API_URL}/harvest/${harvestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(harvestData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update harvest');
    }
    return await response.json();
}

async function deleteHarvest(harvestId) {
    const response = await fetch(`${API_URL}/harvest/${harvestId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete harvest');
    }
    return await response.json();
}

// Sales API calls

async function fetchSales() {
    const response = await fetch(`${API_URL}/sales`);
    if (!response.ok) throw new Error('Failed to fetch sales');
    return await response.json();
}

async function createSale(saleData) {
    const response = await fetch(`${API_URL}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create sale');
    }
    return await response.json();
}

async function updateSale(saleId, saleData) {
    const response = await fetch(`${API_URL}/sales/${saleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update sale');
    }
    return await response.json();
}

async function deleteSale(saleId) {
    const response = await fetch(`${API_URL}/sales/${saleId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete sale');
    }
    return await response.json();
}

// Weather API calls

async function fetchWeather() {
    const response = await fetch(`${API_URL}/weather`);
    if (!response.ok) throw new Error('Failed to fetch weather records');
    return await response.json();
}

async function createWeather(weatherData) {
    const response = await fetch(`${API_URL}/weather`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weatherData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create weather record');
    }
    return await response.json();
}

async function updateWeather(weatherId, weatherData) {
    const response = await fetch(`${API_URL}/weather/${weatherId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weatherData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update weather record');
    }
    return await response.json();
}

async function deleteWeather(weatherId) {
    const response = await fetch(`${API_URL}/weather/${weatherId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete weather record');
    }
    return await response.json();
}

// Equipment API calls

async function fetchEquipment() {
    const response = await fetch(`${API_URL}/equipment`);
    if (!response.ok) throw new Error('Failed to fetch equipment');
    return await response.json();
}

async function createEquipment(equipmentData) {
    const response = await fetch(`${API_URL}/equipment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(equipmentData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create equipment');
    }
    return await response.json();
}

async function updateEquipment(equipmentId, equipmentData) {
    const response = await fetch(`${API_URL}/equipment/${equipmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(equipmentData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update equipment');
    }
    return await response.json();
}

async function deleteEquipment(equipmentId) {
    const response = await fetch(`${API_URL}/equipment/${equipmentId}`, { method: 'DELETE' });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete equipment');
    }
    return await response.json();
}





// ============================================================
// Equipment Rental API helpers
// ============================================================

async function fetchEquipmentRentals() {
    const response = await fetch(`${API_URL}/equipment-rentals`);
    if (!response.ok) throw new Error('Failed to fetch equipment rentals');
    return await response.json();
}

async function fetchEquipmentRental(rentalId) {
    const response = await fetch(`${API_URL}/equipment-rentals/${rentalId}`);
    if (!response.ok) throw new Error('Failed to fetch equipment rental');
    return await response.json();
}

async function createEquipmentRental(rentalData) {
    const response = await fetch(`${API_URL}/equipment-rentals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rentalData)
    });
    if (!response.ok) throw new Error('Failed to create equipment rental');
    return await response.json();
}

async function updateEquipmentRental(rentalId, rentalData) {
    const response = await fetch(`${API_URL}/equipment-rentals/${rentalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rentalData)
    });
    if (!response.ok) throw new Error('Failed to update equipment rental');
    return await response.json();
}

async function deleteEquipmentRental(rentalId) {
    const response = await fetch(`${API_URL}/equipment-rentals/${rentalId}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete equipment rental');
    return await response.json();
}

// ============================================================
// Fertilizer API helpers
// ============================================================

async function fetchFertilizers() {
    const response = await fetch(`${API_URL}/fertilizers`);
    if (!response.ok) throw new Error('Failed to fetch fertilizers');
    return await response.json();
}

async function fetchFertilizer(id) {
    const response = await fetch(`${API_URL}/fertilizers/${id}`);
    if (!response.ok) throw new Error('Failed to fetch fertilizer');
    return await response.json();
}

async function createFertilizer(data) {
    const response = await fetch(`${API_URL}/fertilizers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create fertilizer');
    return await response.json();
}

async function updateFertilizer(id, data) {
    const response = await fetch(`${API_URL}/fertilizers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update fertilizer');
    return await response.json();
}

async function deleteFertilizer(id) {
    const response = await fetch(`${API_URL}/fertilizers/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete fertilizer');
    return await response.json();
}

// ============================================================
// Fertilizer Usage API helpers
// ============================================================

async function fetchFertilizerUsages() {
    const response = await fetch(`${API_URL}/fertilizer-usage`);
    if (!response.ok) throw new Error('Failed to fetch fertilizer usage');
    return await response.json();
}

async function fetchFertilizerUsage(id) {
    const response = await fetch(`${API_URL}/fertilizer-usage/${id}`);
    if (!response.ok) throw new Error('Failed to fetch fertilizer usage');
    return await response.json();
}

async function createFertilizerUsage(data) {
    const response = await fetch(`${API_URL}/fertilizer-usage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create fertilizer usage');
    return await response.json();
}

async function updateFertilizerUsage(id, data) {
    const response = await fetch(`${API_URL}/fertilizer-usage/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update fertilizer usage');
    return await response.json();
}

async function deleteFertilizerUsage(id) {
    const response = await fetch(`${API_URL}/fertilizer-usage/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete fertilizer usage');
    return await response.json();
}




// ============================================================
// Profit Calculation API helpers
// ============================================================

async function fetchProfitCalculations() {
    const response = await fetch(`${API_URL}/profit-calculation`);
    if (!response.ok) throw new Error('Failed to fetch profit calculations');
    return await response.json();
}

async function fetchProfitCalculation(id) {
    const response = await fetch(`${API_URL}/profit-calculation/${id}`);
    if (!response.ok) throw new Error('Failed to fetch profit calculation');
    return await response.json();
}

async function createProfitCalculation(data) {
    const response = await fetch(`${API_URL}/profit-calculation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create profit calculation');
    return await response.json();
}

async function updateProfitCalculation(id, data) {
    const response = await fetch(`${API_URL}/profit-calculation/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update profit calculation');
    return await response.json();
}

async function deleteProfitCalculation(id) {
    const response = await fetch(`${API_URL}/profit-calculation/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete profit calculation');
    return await response.json();
}




// ============================================================
// Reports API helpers
// ============================================================

async function fetchFarmerProfitSummary() {
    const response = await fetch(`${API_URL}/reports/farmer-profit-summary`);
    if (!response.ok) throw new Error('Failed to fetch farmer profit summary');
    return await response.json();
}

async function fetchEquipmentRentalDetails() {
    const response = await fetch(`${API_URL}/reports/equipment-rental-details`);
    if (!response.ok) throw new Error('Failed to fetch equipment rental details');
    return await response.json();
}

async function fetchMarketSalesSummary() {
    const response = await fetch(`${API_URL}/reports/market-sales-summary`);
    if (!response.ok) throw new Error('Failed to fetch market sales summary');
    return await response.json();
}