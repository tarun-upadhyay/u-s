require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const xss = require("xss-clean");
const jwt = require("jsonwebtoken");
const express = require("express");
const connectDB = require("./db/db.conect");
const urlRoute = require("./routes/url.route");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authentication = require("./middleware/authentication");
const URL = require("./Models/url.model");
const app = express();
app.use(express.json());
app.use(helmet());
app.use(xss());

app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const data = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    res.redirect(data.redirectURL);
  } catch (error) {
    res.send({ error, msg: "shortned route" });
  }
});
app.use("/api/v1/url", authentication, urlRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8008;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(() => console.log(`Db is connect`))
      .catch((err) => console.log(err));
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
