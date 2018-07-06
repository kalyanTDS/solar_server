'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config');
var plantService = require('../services/PlantsService');
var inverterService = require('../services/InvertersService');
var energyMeterService = require('../services/EnergyMetersService');
var dashboardService = require('../services/DashboardsService');
var log = require('../utils/Logger');

let router = express.Router();
let sampleError = {
    type: 'ErrorType',
    message: 'Error occured',
    messageCode: 1052 // Optional message code (numeric)
};

router.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

/**
 * @swagger
 * /dashboards/user:
 *   post:
 *     summary: Get user dashboard
 *     description: Returns user dashboard data
 *     tags:
 *       - Dashboards
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: body
 *         required: true
 *         type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFqZXNoIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTI5Mzg5NjA3LCJleHAiOjE1MjkzOTEwNDd9.Q0jD6PmFtzWDTc8Zn0zXd2I61s--Jnlex1ZuOrNwuF8
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.post('/user', function (req, res) {
    try {
        var results = {};
        plantService.getPlantByUserID(req.decoded.user.email).then(function (data) {
            results.plant = data[0];
            inverterService.getInverter(results.plant.inverterID).then(function (data) {
                results.inverter = data[0];
                energyMeterService.getEnergyMeter(results.plant.energyMeterID).then(function (data) {
                    results.energyMeter = data[0];
                    var aggResults = dashboardService.getUserDashboardData(results);
                    res.status(200).send({ results: aggResults });
                });
            });
        }).catch(function (error) {
            log.error('Failed')
            res.status(500).send(error);
        });
    } catch (e) {
        log.error('Route failed with error', e);
        res.status(500).send(e);
    }
});

module.exports = router;