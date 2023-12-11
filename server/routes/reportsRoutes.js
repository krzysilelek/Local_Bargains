const express = require("express");
const router = express.Router();
const errorHandler = require("../handlers/errors");

const DatabaseController = require("../controllers/DatabaseController");
const AuthorizationController = require("../controllers/AuthorizationController");


router.post(
  "/api/reports/add",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.addNewReport)
);

router.delete(
  "/api/reports/delete",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.checkIfAdmin),
  errorHandler.catchAsync(DatabaseController.deleleReport)
);

router.get(
  "/api/reports/ofBargain/:bargainId",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.checkIfAdmin),
  errorHandler.catchAsync(DatabaseController.getReportsOfBargain)
);

router.get(
  "/api/reports/get",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.checkIfAdmin),
  errorHandler.catchAsync(DatabaseController.getReportsNumber)
);

module.exports = router;
