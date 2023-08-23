const { nanoid } = require("nanoid");
const linkCheck = require("link-check");
const { BadRequestError } = require("../errors");
const URL = require("../Models/url.model");
const { StatusCodes } = require("http-status-codes");

async function getAllUrl(req, res) {
  const { search, sort } = req.query;
  console.log(search,sort)

  const queryObject = {
    createdBy: req.user.userEmail,
  };
  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }
  let result = URL.find(queryObject);
  if (sort === "latest") {
    result = result.sort("-createdAt");
  } else if (sort === "oldest") {
    result = result.sort("createdAt");
  } else if (sort === "a-z") {
    result = result.sort("position");
  } else if (sort === "z-a") {
    result = result.sort("-position");
  }

  const urlData = await result;

  res.status(StatusCodes.OK).json({ urlData });
}
async function createShortUrl(req, res) {
  const { redirectURL } = req.body;
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

  res.status(StatusCodes.OK).json({ msg: "create", urlcreated });
}

async function getAnalytics(req, res) {
  res.send({ msg: "Getallurl" });
}
module.exports = { getAllUrl, createShortUrl, getAnalytics };
