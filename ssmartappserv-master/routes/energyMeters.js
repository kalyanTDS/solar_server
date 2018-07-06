'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config');
var energyMeterService = require('../services/EnergyMetersService');
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
 * /energyMeters:
 *   post:
 *     summary: Get all energyMeter
 *     description: Returns all energyMeter with details
 *     tags:
 *       - EnergyMeters
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
router.post('/', function (req, res) {
	try {
		var promise = energyMeterService.getAllEnergyMeters();

		promise.then(function (data) {
			// Do something (if required) with the data, then send it to the client
			res.status(200).send(data);
		});

		promise.catch(function (error) {
			// Never send stack traces to the client.
			log.error('Failed')
			res.status(500).send(error);
		});
	} catch (e) {
		// Use a good logging framework for logging to file
		log.error('Route /posts/ failed with error', e);
		res.status(500).send(e);
	}
});

/**
 * @swagger
 * /energyMeters/energyMeter:
 *   post:
 *     summary: Get details of a energyMeter
 *     description: Returns details of a single energyMeter
 *     tags:
 *       - EnergyMeters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: energyMeterID
 *         description: ID of the energyMeter to fetch
 *         in: body
 *         required: true
 *         type: string
 *         example: 1
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.post('/energyMeter', function (req, res) {
	// This route needs to be ordered before /:postId since express will match '/post' to be path param as well
	try {
		var promise = energyMeterService.getEnergyMeter(req.body.energyMeterID);

		promise.then(function (data) {
			// Do something (if required) with the data, then send it to the client
			res.status(200).send(data);
		});

		promise.catch(function (error) {
			// Never send stack traces to the client.
			res.status(500).send(error);
		});
	} catch (e) {
		// Use a good logging framework for logging to file
		res.status(500).send(e);
	}
});

/**
 * @swagger
 * /energyMeters/newEnergyMeter:
 *   post:
 *     summary: Add new energyMeter details
 *     description: Returns details of a new energyMeter
 *     tags:
 *       - EnergyMeters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: energyMeterID
 *         description: ID of the energyMeter
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.post('/newEnergyMeter', function (req, res) {
	// This route needs to be ordered before /:postId since express will match '/post' to be path param as well
	try {
		var promise = energyMeterService.newEnergyMeter(req.body);

		if (promise._id) {
			res.status(200).send({ energyMeter: promise, message: 'EnergyMeter added successfully.' });
		} else {
			res.status(500).send(error);
		}
	} catch (e) {
		// Use a good logging framework for logging to file
		res.status(500).send(e);
	}
});

module.exports = router;