const express = require("express");
const router = express.Router();
const errorHandler = require("../handlers/errors");

const DatabaseController = require("../controllers/DatabaseController");
const AuthorizationController = require("../controllers/AuthorizationController");


router.post(
  "/api/auth/login",
  errorHandler.catchAsync(DatabaseController.getPassword),
  errorHandler.catchAsync(DatabaseController.checkRole),
  errorHandler.catchAsync(AuthorizationController.login)
);

router.post(
  "/api/auth/refresh",
  errorHandler.catchAsync(AuthorizationController.decodeRefreshToken),
  errorHandler.catchAsync(DatabaseController.checkActiveStatus),
  errorHandler.catchAsync(AuthorizationController.refresh)
);

router.post(
  "/api/auth/register",
  errorHandler.catchAsync(DatabaseController.addNewUser)
);

module.exports = router;
