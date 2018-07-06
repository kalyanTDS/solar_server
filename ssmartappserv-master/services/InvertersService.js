'use strict';
var Inverter = require('../models/inverter');

module.exports = {
    getAllInverters: function () {
        const records = Inverter.find({}, function (err, docs) {
            if (!err) {
                return docs;
            }
        });
        return records;
    },
    getInverter: function (inverterID) {
        const record = Inverter.find({ inverterID: inverterID }, function (err, doc) {
            if (!err) {
                return doc;
            }
        });
        return record;
    },
    newInverter: function (newInverter) {
        const record = new Inverter(newInverter);
        record.save(function (err, doc) {
            if (!err) {
                record._id = doc._id;
            }
        });
        return record;
    }
}