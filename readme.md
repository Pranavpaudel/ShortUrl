# ShortUrl

A simple URL shortener API built with Node.js, Express, and MongoDB. Create short links and track visit analytics.

## Features

- **Create short URLs** — Submit a long URL and get a unique short ID
- **Redirect** — Visiting `/:shortId` redirects to the original URL
- **Visit tracking** — Each redirect is recorded with a timestamp
- **Analytics** — Get total visits and visit history for any short URL

## Tech Stack

- **Node.js** — Runtime
- **Express** — Web framework
- **MongoDB** — Database (via Mongoose)
- **shortid** — Unique short ID generation

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally or a connection string

## Installation

1. Clone the repository and go to the project folder:

   ```bash
   cd ShortUrl
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure MongoDB is running. The app uses the database `shorturl` at `mongodb://localhost:27017/shorturl` by default. To use another database, change the connection string in `index.js`.

## Running the App

```bash
npm start
```

The server starts on **port 8001** after connecting to MongoDB. You should see:

```
Connected to MongoDB
Server is running on port 8001
```

## API Reference

Base URL: `http://localhost:8001`

### Create a short URL

**POST** `/url`

Creates a new short URL and returns its ID.

**Request**

- **Content-Type:** `application/json`
- **Body:**

  ```json
  {
    "originalUrl": "https://example.com/very-long-page"
  }
  ```

**Response** (200)

```json
{
  "id": "kLblU11HN"
}
```

**Error** (400) — Missing URL

```json
{
  "error": "Original URL is required"
}
```

---

### Redirect to original URL

**GET** `/:shortId`

Redirects to the original URL and records a visit.

**Example:** `GET http://localhost:8001/kLblU11HN` → redirects to the stored original URL.

**Note:** Returns 404 if the short ID does not exist.

---

### Get analytics for a short URL

**GET** `/url/analytics/:shortId`

Returns total visits and visit history for the given short ID.

**Example:** `GET http://localhost:8001/url/analytics/kLblU11HN`

**Response** (200)

```json
{
  "totalVisits": 5,
  "visitHistory": [
    { "timeStamp": 1708612345678 },
    { "timeStamp": 1708612400000 }
  ]
}
```

## Project Structure

```
ShortUrl/
├── index.js          # App entry, Express setup, redirect route
├── connect.js        # MongoDB connection
├── package.json
├── readme.md
├── controllers/
│   └── url.js        # handleGenerateNewShortUrl, handleGetAnalytics
├── models/
│   └── url.js        # Mongoose URL schema
└── routes/
    └── url.js        # POST /url, GET /url/analytics/:shortId
```

## Testing with Postman

1. **Create a short URL**
   - Method: **POST**
   - URL: `http://localhost:8001/url`
   - Headers: `Content-Type: application/json`
   - Body (raw, JSON): `{ "originalUrl": "https://www.example.com/page" }`

2. **Redirect**
   - Open in browser or send **GET** to `http://localhost:8001/<id>` (use the `id` from step 1).

3. **Analytics**
   - Method: **GET**
   - URL: `http://localhost:8001/url/analytics/<id>`

## Database

- **Database name:** `shorturl`
- **Collection:** `urls` (Mongoose pluralizes the model name `Url`)

In `mongosh`:

```
use shorturl
show collections
db.urls.find()
```

## License

ISC
