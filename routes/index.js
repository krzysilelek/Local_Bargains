const express = require('express');
const router = express.Router();
const PagesController = require('../controllers/PagesController');
const DatabaseController = require('../controllers/DatabaseController');

router.get('/', PagesController.home);
router.post('/db', DatabaseController.db, PagesController.db);

module.exports = router;

