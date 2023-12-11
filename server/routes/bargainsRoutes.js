const express = require("express");
const router = express.Router();
const errorHandler = require("../handlers/errors");

const DatabaseController = require("../controllers/DatabaseController");
const AuthorizationController = require("../controllers/AuthorizationController");


router.get(
  "/api/bargains/:pageSize/:page",
  errorHandler.catchAsync(DatabaseController.getBargainsPaginate)
);

router.get(
  "/api/bargains/getLocal/:client_lat/:client_lon/:radius/:tags",
  errorHandler.catchAsync(DatabaseController.getLocalBargains)
);

router.get(
  "/api/bargains",
  errorHandler.catchAsync(DatabaseController.getBargains)
);

router.get(
  "/api/bargain/:id",
  errorHandler.catchAsync(DatabaseController.getBargain)
);

router.get(
  "/api/bargainsOfUser",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.getBargainsOfUser)
);

router.post(
  "/api/bargains/add",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.addNewBargain)
)

router.put(
  "/api/bargains/edit",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.editBargain)
);

router.delete(
  "/api/bargains/delete",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.deleteBargain)
);

module.exports = router;
