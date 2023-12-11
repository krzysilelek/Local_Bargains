const express = require("express");
const router = express.Router();

const AuthRoutes = require('./authRoutes.js');
const BargainsRoutes = require('./bargainsRoutes.js');
const CommentsRoutes = require('./commentsRoutes.js');
const ReportsRoutes = require('./reportsRoutes.js');
const TagsRoutes = require('./tagsRoutes.js');
const UsersRoutes = require('./usersRoutes.js');

router.use("/", AuthRoutes);
router.use("/", BargainsRoutes);
router.use("/", CommentsRoutes);
router.use("/", ReportsRoutes);
router.use("/", TagsRoutes);
router.use("/", UsersRoutes);

module.exports = router;

