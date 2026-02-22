//requre /import express
const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoutes = require("./routes/url");
const { connect } = require("mongoose");
const url = require("./models/url");

// create app and port
const app = express();
const port = 8001;

app.use(express.json());

app.use("/url", urlRoutes);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await url.findOneAndUpdate(
    { shortUrl: shortId },
    { $push: { visitHistory: { timeStamp: Date.now() } } },
  );
  res.redirect(entry.originalUrl);
});

connectToMongoDB("mongodb://localhost:27017/shorturl")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
