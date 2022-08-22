const express = require("express");

const newadmin = require("../routes/admin");
const loginadmin = require("../routes/login");
const errorHandlerMiddleware = require("../middleware/error-handler");
const books = require("../routes/Book");
const reviews = require("../routes/Review");
var cors = require("cors");

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());

  app.use("/api/v1/register", newadmin);
  app.use("/api/v1/login", loginadmin);
  app.use("/api/v1/books", books);
  app.use("/api/v1/reviews", reviews);

  app.use(errorHandlerMiddleware);
};
