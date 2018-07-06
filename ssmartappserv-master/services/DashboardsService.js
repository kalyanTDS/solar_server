'use strict';

module.exports = {
    getUserDashboardData: function (data) {
        var aggResults = {};
        const unitCost = 6;
        var todaySavings = 0;
        var totalSavings = 0;
        var CO2Savings = 0;
        var avgUnitsGenPerDay = 4;
        const CO2Avoidance = 0.6; // in kg/kWh
        const plant = data.plant;
        const inverter = data.inverter;
        const energyMeter = data.energyMeter;
        if (plant && inverter && energyMeter) {
            var solarEnergyGen = inverter.W;
            var solarEnergyToGrid = energyMeter.WhReceived;
            var solarEnergyConByLoad = solarEnergyGen - solarEnergyToGrid;
            var gridEnergyConByLoad = energyMeter.WattsTotal;
            todaySavings = solarEnergyGen * unitCost;
            totalSavings = todaySavings;
            CO2Savings = plant.capacity * avgUnitsGenPerDay * 365 * CO2Avoidance; // per Year

            aggResults.plantID = plant.plantID || 'P0001';
            aggResults.inverterID = plant.inverterID || 'Inv0001';
            aggResults.energyMeterID = plant.energyMeterID || 'EM0001';
            aggResults.inverterType = plant.inverterType || 'hybrid';
            aggResults.capacity = plant.capacity || '1';
            aggResults.latitude = plant.latitude || '17.46';
            aggResults.longitude = plant.longitude || '78.47';

            aggResults.pf = energyMeter.PFAve_Inst.toFixed(2) || '44.00';
            aggResults.A_solarEnergyGen = solarEnergyGen.toFixed(2) || '0.80';
            aggResults.B_solarEnergyToGrid = solarEnergyToGrid.toFixed(2) || '0.50';
            aggResults.D_solarEnergyConByLoad = solarEnergyConByLoad.toFixed(2) || '0.30';
            aggResults.C_gridEnergyConByLoad = gridEnergyConByLoad.toFixed(2) || '96.00';
            aggResults.todaySavings = todaySavings.toFixed(2) || '4.80';
            aggResults.totalSavings = totalSavings.toFixed(2) || '4.80';
            aggResults.CO2Savings = CO2Savings.toFixed(2) || '876.00';
        }
        return aggResults;
    },
}