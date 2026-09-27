// Main application entry point

// Initialize application on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Agriculture Management System loaded');


    
    // Initialize AI Chat (adds welcome message)
    initAiChat();



    // Load initial data for all entities
    loadFarmers();
    loadEquipmentRentals();
    loadEquipmentRentalFarmers();
    loadEquipmentRentalEquipment();
    loadFertilizers();
    loadPlantingRecordsForFertilizerUsageDropdown();
    loadFertilizersForUsageDropdown();
    loadFertilizerUsages();
    loadProfitCalculations();
    loadProfitFarmers();


});

// Export global functions for onclick handlers
// These are used in the HTML onclick attributes

window.switchTab = switchTab;

// Farmers
window.addOrUpdateFarmer = addOrUpdateFarmer;
window.resetFarmerForm = resetFarmerForm;
window.editFarmer = editFarmer;
window.deleteFarmerConfirm = deleteFarmerConfirm;

// Crops
window.addOrUpdateCrop = addOrUpdateCrop;
window.resetCropForm = resetCropForm;
window.editCrop = editCrop;
window.deleteCropConfirm = deleteCropConfirm;

// Land
window.addOrUpdateLand = addOrUpdateLand;
window.resetLandForm = resetLandForm;
window.editLand = editLand;
window.deleteLandConfirm = deleteLandConfirm;

// Equipment
window.addOrUpdateEquipment = addOrUpdateEquipment;
window.resetEquipmentForm = resetEquipmentForm;
window.editEquipment = editEquipment;
window.deleteEquipmentConfirm = deleteEquipmentConfirm;

// Markets
window.addOrUpdateMarket = addOrUpdateMarket;
window.resetMarketForm = resetMarketForm;
window.editMarket = editMarket;
window.deleteMarketConfirm = deleteMarketConfirm;

// Planting Records
window.addOrUpdatePlantingRecord = addOrUpdatePlantingRecord;
window.resetPlantingRecordForm = resetPlantingRecordForm;
window.editPlantingRecord = editPlantingRecord;
window.deletePlantingRecordConfirm = deletePlantingRecordConfirm;

// Harvest
window.addOrUpdateHarvest = addOrUpdateHarvest;
window.resetHarvestForm = resetHarvestForm;
window.editHarvest = editHarvest;
window.deleteHarvestConfirm = deleteHarvestConfirm;

// Sales
window.addOrUpdateSale = addOrUpdateSale;
window.resetSaleForm = resetSaleForm;
window.editSale = editSale;
window.deleteSaleConfirm = deleteSaleConfirm;

// Weather
window.addOrUpdateWeather = addOrUpdateWeather;
window.resetWeatherForm = resetWeatherForm;
window.editWeather = editWeather;
window.deleteWeatherConfirm = deleteWeatherConfirm;

// Equipment Rental
window.addOrUpdateEquipmentRental = addOrUpdateEquipmentRental;
window.resetEquipmentRentalForm = resetEquipmentRentalForm;
window.editEquipmentRental = editEquipmentRental;
window.deleteEquipmentRentalConfirm = deleteEquipmentRentalConfirm;

// Fertilizers
window.addOrUpdateFertilizer = addOrUpdateFertilizer;
window.resetFertilizerForm = resetFertilizerForm;
window.editFertilizer = editFertilizer;
window.deleteFertilizerConfirm = deleteFertilizerConfirm;

// Fertilizer Usage
window.addOrUpdateFertilizerUsage = addOrUpdateFertilizerUsage;
window.resetFertilizerUsageForm = resetFertilizerUsageForm;
window.editFertilizerUsage = editFertilizerUsage;
window.deleteFertilizerUsageConfirm = deleteFertilizerUsageConfirm;



// Profit Calculation
window.addOrUpdateProfitCalculation = addOrUpdateProfitCalculation;
window.resetProfitCalculationForm = resetProfitCalculationForm;
window.editProfitCalculation = editProfitCalculation;
window.deleteProfitCalculationConfirm = deleteProfitCalculationConfirm;




// Reports
window.loadReport = loadReport;
window.resetReportView = resetReportView;


// AI Chat Board
window.openAiChat = openAiChat;
window.closeAiChat = closeAiChat;
window.sendChatMessage = sendChatMessage;
window.handleChatKeydown = handleChatKeydown;