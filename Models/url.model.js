const { default: mongoose } = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    shortId: { type: String, required: true, unique: true },
    title: {
      type: String,
      required: [true, "Please provide title of url"],
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: [true, "Please login i don't email"],
      ref: "User",
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const URL = mongoose.model("Url", UrlSchema);
module.exports = URL;
