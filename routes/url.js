const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleGetAnalyticsPage,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/analytics/:shortId/view", handleGetAnalyticsPage);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
