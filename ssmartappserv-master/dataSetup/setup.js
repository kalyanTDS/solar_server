
'use strict';

var Plant = require('../models/plant');
var Inverter = require('../models/inverter');
var EnergyMeter = require('../models/energyMeter');
var plantService = require('../services/PlantsService');
var inverterService = require('../services/InvertersService');
var energyMeterService = require('../services/EnergyMetersService');

module.exports = {
    init: function () {
        Inverter.remove({}, function (err) {
            if (!err) {
                console.log('Collection Inverter removed.........');
                var inverter = {
                    inverterID: "Inv0001",
                    SID: "AD0254",
                    Time: "14/11/2017 19:00",
                    IphA: "5.5",
                    IphB: "5.4",
                    IphC: "5.2",
                    VphA: "219",
                    VphB: "219",
                    VphC: "218",
                    W: "0.8",
                    Hz: "49",
                    VA: "27",
                    Var: "5",
                    PF: "24",
                    WH: "91",
                    DCA: "30",
                    DCV: "86",
                    DCW: "91"
                };
                inverterService.newInverter(inverter);
                console.log('Collection Inverter created and added sample data..................');
            }
        });
        EnergyMeter.remove({}, function (err) {
            if (!err) {
                console.log('Collection EnergyMeter removed.........');
                var energyMeter = {
                    energyMeterID: "EM0001",
                    logID: "1",
                    Time: "14/11/2017 19:00",
                    WattsTotal: "96",
                    WattsRPhase: "52",
                    WattsYPhase: "33",
                    WattsBPhase: "76",
                    VARTotal: "68",
                    VARRPhase: "27",
                    VARYPhase: "43",
                    VARBPhase: "19",
                    PFAve_Inst: "44",
                    PFRPhase: "24",
                    PFYPhase: "76",
                    PFBPhase: "20",
                    VATotal: "67",
                    VARPhase: "5",
                    VAYPhase: "64",
                    VABPhase: "44",
                    VryPhase: "56",
                    VybPhase: "57",
                    VbrPhase: "82",
                    VLNAvg: "49",
                    VRPhase: "65",
                    VYPhase: "7",
                    VBPhase: "70",
                    CurrentRPhase: "30",
                    CurrentYPhase: "86",
                    CurrentBPhase: "91",
                    Frequnecy: "71",
                    WhReceived: "0.5"
                };
                energyMeterService.newEnergyMeter(energyMeter);
                console.log('Collection EnergyMeter created and added sample data..................');
            }
        });
        Plant.remove({}, function (err) {
            if (!err) {
                console.log('Collection Plant removed.........');
                var plant = {
                    plantID: "P0001",
                    inverterType: "hybrid",
                    capacity: "1",
                    latitude: "17.461046",
                    longitude: "78.476301",
                    inverterID: "Inv0001",
                    energyMeterID: "EM0001",
                    userID: "sample@gmail.com"
                };
                plantService.newPlant(plant);
                console.log('Collection Plant created and added sample data..................');
            }
        });
    }
}