const express = require('express');
const router = express.Router();
const { analyzeDeal } = require('../controllers/analyzeController');

router.post('/', analyzeDeal);

module.exports = router;