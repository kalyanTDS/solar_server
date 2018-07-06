var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Plant', new Schema({
    plantID: String,
    inverterType: String,
    capacity: String,
    latitude: String,
    longitude: String,
    inverterID: String,
    energyMeterID: String,
    userID: String
}));