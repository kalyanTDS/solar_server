var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Inverter', new Schema({
    inverterID: String,
    SID: String,
    Time: String,
    IphA: Number,
    IphB: Number,
    IphC: Number,
    VphA: Number,
    VphB: Number,
    VphC: Number,
    W: Number,
    Hz: Number,
    VA: Number,
    Var: Number,
    PF: Number,
    WH: Number,
    DCA: Number,
    DCV: Number,
    DCW: Number
}));