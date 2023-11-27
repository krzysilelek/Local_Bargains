const express = require("express");
const router = express.Router();
const DatabaseController = require("../controllers/DatabaseController");
const AuthorizationController = require("../controllers/AuthorizationController");
const errorHandler = require("../handlers/errors");


router.get(
  "/api/users",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.test)
);

router.get(
  "/api/bargains/:pageSize/:page",
  errorHandler.catchAsync(DatabaseController.getBargainsPaginate)
);

router.get(
  "/api/bargains",
  errorHandler.catchAsync(DatabaseController.getBargains)
);

router.get(
  "/api/bargain/:id",
  errorHandler.catchAsync(DatabaseController.getBargain)
);

router.post(
  "/api/auth/login",
  errorHandler.catchAsync(DatabaseController.getPassword),
  errorHandler.catchAsync(AuthorizationController.login)
);

router.post(
  "/api/auth/refresh",
  errorHandler.catchAsync(AuthorizationController.refresh)
);

router.post(
  "/api/auth/register",
  errorHandler.catchAsync(DatabaseController.addNewUser)
);

module.exports = router;
