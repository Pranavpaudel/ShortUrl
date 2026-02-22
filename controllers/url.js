const shortid = require("shortid");
const Url = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const shortId = shortid.generate();
  const body = req.body;
  if (!body || !body.originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }
  try {
    await Url.create({
      shortUrl: shortId,
      originalUrl: req.body.originalUrl,
      visitHistory: [],
    });
    return res.json({ id: shortId });
  } catch (err) {
    console.error("Failed to save URL:", err);
    return res.status(500).json({
      error: "Failed to save short URL",
      details: err.message,
    });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortUrl: shortId });
  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  const visitHistory = result.visitHistory || [];
  return res.json({
    shortId,
    originalUrl: result.originalUrl,
    totalVisits: visitHistory.length,
    visitHistory,
  });
}

function getAnalyticsHtml(shortId, originalUrl, totalVisits, visitHistory) {
  const visitsList = (visitHistory || [])
    .map(
      (v) =>
        `<li>${v.timeStamp ? new Date(v.timeStamp).toLocaleString() : "—"}</li>`
    )
    .join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Analytics — ${shortId}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; max-width: 560px; margin: 2rem auto; padding: 0 1rem; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .meta { color: #666; font-size: 0.9rem; margin-bottom: 1.5rem; }
    .stat { font-size: 2rem; font-weight: 700; color: #0ea5e9; margin: 1rem 0; }
    a { color: #0ea5e9; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { padding: 0.5rem 0; border-bottom: 1px solid #eee; }
  </style>
</head>
<body>
  <h1>Analytics for short URL</h1>
  <p class="meta">Short ID: <strong>${shortId}</strong></p>
  <p class="meta">Original URL: <a href="${originalUrl}" target="_blank" rel="noopener">${originalUrl}</a></p>
  <p class="stat">${totalVisits} visit${totalVisits !== 1 ? "s" : ""}</p>
  <h2>Visit history</h2>
  <ul>${visitsList || "<li>No visits yet</li>"}</ul>
</body>
</html>`;
}

async function handleGetAnalyticsPage(req, res) {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortUrl: shortId });
  if (!result) {
    res.status(404).send(
      "<!DOCTYPE html><html><body><h1>Short URL not found</h1></body></html>"
    );
    return;
  }
  const visitHistory = result.visitHistory || [];
  const html = getAnalyticsHtml(
    shortId,
    result.originalUrl,
    visitHistory.length,
    visitHistory
  );
  res.type("html").send(html);
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleGetAnalyticsPage,
};
