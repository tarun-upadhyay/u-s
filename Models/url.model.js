const { default: mongoose } = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    shortId: { type: String, required: true, unique: true },
    redirectURL: {
      type: String,
      required: true,
    },
    userEmail: {
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
