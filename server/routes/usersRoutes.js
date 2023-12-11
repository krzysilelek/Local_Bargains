const express = require("express");
const router = express.Router();
const errorHandler = require("../handlers/errors");

const DatabaseController = require("../controllers/DatabaseController");
const AuthorizationController = require("../controllers/AuthorizationController");
const InformationController = require("../controllers/InformationController")


router.get(
  "/api/users",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.checkIfAdmin),
  errorHandler.catchAsync(DatabaseController.getUsers)
);

router.delete(
  "/api/users/delete",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.checkIfAdmin),
  errorHandler.catchAsync(DatabaseController.deleteUser)
);

router.put(
  "/api/users/switchActive",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.checkIfAdmin),
  errorHandler.catchAsync(DatabaseController.switchActive)
);

router.get(
  "/api/user/getInfo",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.checkRole),
  errorHandler.catchAsync(DatabaseController.getRoleName),
  errorHandler.catchAsync(InformationController.getUserInfo)
);

module.exports = router;
