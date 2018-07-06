'use strict';
var Plant = require('../models/plant');

module.exports = {
    getAllPlants: function () {
        const records = Plant.find({}, function (err, docs) {
            if (!err) {
                return docs;
            }
        });
        return records;
    },
    getPlant: function (plantID) {
        const record = Plant.find({ plantID: plantID }, function (err, doc) {
            if (!err) {
                return doc;
            }
        });
        return record;
    },
    getPlantByUserID: function (email) {
        const record = Plant.find({ userID: email }, function (err, doc) {
            if (!err) {
                return doc;
            }
        });
        return record;
    },
    newPlant: function (newPlant) {
        const record = new Plant(newPlant);
        record.save(function (err, doc) {
            if (!err) {
                record._id = doc._id;
            }
        });
        return record;
    }
}