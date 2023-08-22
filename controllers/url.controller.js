const { nanoid } = require("nanoid");


async function getAllUrl(req, res) {
  res.send({ msg: "Getallurl" });
}
async function createShortUrl(req, res) {
  //  async function create
  //console.log(nanoid(10));
  const id = await nanoid(4);
  res.send({ msg: "Getallurl",id });
}

async function getAnalytics(req, res) {
  res.send({ msg: "Getallurl" });
}
module.exports = { getAllUrl, createShortUrl, getAnalytics };
