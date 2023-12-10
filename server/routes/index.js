const express = require("express");
const router = express.Router();
const DatabaseController = require("../controllers/DatabaseController");
const AuthorizationController = require("../controllers/AuthorizationController");
const InformationController = require("../controllers/InformationController")
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
  "/api/bargains/getLocal/:client_lat/:client_lon/:radius",
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

router.get(
  "/api/comments/:bargain_id",
  errorHandler.catchAsync(DatabaseController.listAllComments)
);

router.post(
  "/api/comments/add",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.addNewComment)
);

router.post(
  "/api/reports/add",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.addNewReport)
);

router.get(
  "/api/tags",
  errorHandler.catchAsync(DatabaseController.getTags)
);

router.get(
  "/api/user/getInfo",
  errorHandler.catchAsync(AuthorizationController.authenticate),
  errorHandler.catchAsync(DatabaseController.checkRole),
  errorHandler.catchAsync(DatabaseController.getRoleName),
  errorHandler.catchAsync(InformationController.getUserInfo)
);


module.exports = router;

