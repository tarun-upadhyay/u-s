const express = require("express");
const {
  getAllUrl,
  createShortUrl,
  getAnalytics,
} = require("../controllers/url.controller");
const urlRoute = express.Router();

urlRoute.route("/").get(getAllUrl);
urlRoute.route("/create").post(createShortUrl);
urlRoute.route("/:id").get(getAnalytics);

module.exports = urlRoute;
