const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },

    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    visitHistory: [
      {
        timeStamp: { type: Number },
      },
    ],
  },
  { timestamps: true },
);

const url = mongoose.model("Url", urlSchema);

module.exports = url;
