const express = require("express");
const router = express.Router();
const PagesController = require("../controllers/PagesController");
const DatabaseController = require("../controllers/DatabaseController");
const AuthorizationController = require("../controllers/AuthorizationController");
const errorHandler = require("../middlewares/errors");


router.get("/", PagesController.home);
router.get(
  "/api/users",
  AuthorizationController.authenticate,
  errorHandler.catchAsync(DatabaseController.test),
  PagesController.db,
);

router.post(
  "/api/auth/login",
  errorHandler.catchAsync(DatabaseController.getPassword),
  errorHandler.catchAsync(AuthorizationController.login)
);

module.exports = router;
