const express = require("express");
const router = express.Router();
const errorHandler = require("../handlers/errors");

const DatabaseController = require("../controllers/DatabaseController");
const AuthorizationController = require("../controllers/AuthorizationController");


router.get(
  "/api/tags",
  errorHandler.catchAsync(DatabaseController.getTags)
);

router.post(
  "/api/tags/add",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.checkIfAdmin),
  errorHandler.catchAsync(DatabaseController.addNewTag)
);

router.put(
  "/api/tags/edit",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.checkIfAdmin),
  errorHandler.catchAsync(DatabaseController.editTag)
);

router.delete(
  "/api/tags/delete",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.checkIfAdmin),
  errorHandler.catchAsync(DatabaseController.deleteTag)
);

module.exports = router;
