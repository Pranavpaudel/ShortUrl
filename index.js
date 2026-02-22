//requre /import express
const express = require('express');
// create app and port
const app = express();
const port = 8001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

