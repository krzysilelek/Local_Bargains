const express = require('express');
const router = express.Router();
const PagesController = require('../controllers/PagesController');
const DatabaseController = require('../controllers/DatabaseController');
const errorHandler = require('../middlewares/errors');

router.get('/', PagesController.home);
router.post(
  '/db',
  errorHandler.catchAsync(DatabaseController.db),
  PagesController.db
);

module.exports = router;

