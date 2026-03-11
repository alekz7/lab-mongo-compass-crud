const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Define 12 separate endpoints
router.get('/query-1', companyController.query1);
router.get('/query-2', companyController.query2);
router.get('/query-3', companyController.query3);
router.get('/query-4', companyController.query4);
router.get('/query-5', companyController.query5);
router.get('/query-6', companyController.query6);
router.get('/query-7', companyController.query7);
router.get('/query-8', companyController.query8);
router.get('/query-9', companyController.query9);
router.get('/query-10', companyController.query10);
router.get('/query-11', companyController.query11);
router.get('/query-12', companyController.query12);

module.exports = router;
