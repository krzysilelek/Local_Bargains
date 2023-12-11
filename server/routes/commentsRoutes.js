const express = require("express");
const router = express.Router();
const errorHandler = require("../handlers/errors");

const DatabaseController = require("../controllers/DatabaseController");
const AuthorizationController = require("../controllers/AuthorizationController");


router.get(
  "/api/comments/:bargain_id",
  errorHandler.catchAsync(DatabaseController.listAllComments)
);

router.post(
  "/api/comments/add",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.addNewComment)
);

module.exports = router;
