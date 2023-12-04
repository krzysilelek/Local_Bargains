require("dotenv").config({ path: ".env" });

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const routes = require("./routes/index");
const errorHandler = require("./handlers/errors");

const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(flash());

app.use("/", routes);

app.use(errorHandler.notFound);
app.use(errorHandler.catchErrors);

module.exports = app;
