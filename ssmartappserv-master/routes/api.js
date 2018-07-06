'use strict';

var express = require('express');
var plantsEndPoint = require('./plants');
var invertersEndPoint = require('./inverters');
var energyMetersEndPoint = require('./energyMeters');
var dashboardsEndPoind = require('./dashboards');

var router = express.Router();

//---------------------------------------------------------------
// API Route specification
//---------------------------------------------------------------
router.use('/plants', plantsEndPoint);
router.use('/inverters', invertersEndPoint);
router.use('/energyMeters', energyMetersEndPoint);
router.use('/dashboards', dashboardsEndPoind);

//---------------------------------------------------------------
// Swagger API Specification - swagger-jsdoc
//---------------------------------------------------------------
var swaggerJSDoc = require('swagger-jsdoc');

var options = {
	swaggerDefinition: {
		info: {
			title: 'SSmart App Service API',
			description: 'SSmart App service API is ExpressJS based microservices',
			version: '0.0.1',
			contact: {
				email: '',
				name: ''
			},
			license: {
				name: '',
				url: ''
			}
		},
		schemes: [
			'http',
			'https'
		],
		basePath: '/api',
		tags: [{
			name: 'Plants',
			description: 'Get details of plants'
		},
		{
			name: 'Inverters',
			description: 'Get details of inverters'
		},
		{
			name: 'EnergyMeters',
			description: 'Get details of energy meters'
		},
		{
			name: 'Dashboards',
			description: 'Get details of dashboards'
		}],
		externalDocs: {
			description: 'More information',
			url: ''
		}
	},
	apis: ['routes/api.js',
		'routes/plants.js',
		'routes/inverters.js',
		'routes/energyMeters.js',
		'routes/dashboards.js'
	],
};

var swaggerSpec = swaggerJSDoc(options);

//---------------------------------------------------------------
// Expose swagger.json at /api/swagger.json
//---------------------------------------------------------------
router.get('/swagger.json', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

module.exports = router;