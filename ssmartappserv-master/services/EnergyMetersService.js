'use strict';
var EnergyMeter = require('../models/energyMeter');

module.exports = {
    getAllEnergyMeters: function () {
        const records = EnergyMeter.find({}, function (err, docs) {
            if (!err) {
                return docs;
            }
        });
        return records;
    },
    getEnergyMeter: function (energyMeterID) {
        const record = EnergyMeter.find({ energyMeterID: energyMeterID }, function (err, doc) {
            if (!err) {
                return doc;
            }
        });
        return record;
    },
    newEnergyMeter: function (newEnergyMeter) {
        const record = new EnergyMeter(newEnergyMeter);
        record.save(function (err, doc) {
            if (!err) {
                record._id = doc._id;
            }
        });
        return record;
    }
}