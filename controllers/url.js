const { shortid } = require("shortid");
const Url = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const shortId = shortid.generate();
  const body = req.body;
  if (!body.originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }
  await Url.create({
    shortId: shortId,
    originalUrl: req.body.originalUrl,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

module.exports = {
  handleGenerateNewShortUrl,
};
