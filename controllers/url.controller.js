const { nanoid } = require("nanoid");
const linkCheck = require("link-check");
const { BadRequestError } = require("../errors");
const URL = require("../Models/url.model");
const { StatusCodes } = require("http-status-codes");

async function getAllUrl(req, res) {
  req.body.createdBy = req.user.userEmail;
  res.send({ msg: "Getallurl" });
}
async function createShortUrl(req, res) {
  let { redirectURL } = req.body;
  if (!redirectURL)
    throw new BadRequestError("Please provide url for shorting");

  linkCheck(redirectURL, function (err, result) {
    if (err) {
      throw new BadRequestError(`Please provide urlf for shorting ${err}`);
    }
  });

  req.body.createdBy = req.user.userEmail;
  req.body.visitHistory = [];
  const shortId = await nanoid(4);
  req.body.shortId = shortId;

  const urlcreated = await URL.create(req.body);

  res.send({ msg: "create", urlcreated });
}

async function getAnalytics(req, res) {
  res.send({ msg: "Getallurl" });
}
module.exports = { getAllUrl, createShortUrl, getAnalytics };
