//requre /import express
const express = require('express');

const { connectToMongoDB } = require('./connect');

const urlRoutes = require('./routes/url');
const { connect } = require('mongoose');
// create app and port
const app = express();
const port = 8001;

connectToMongoDB('mongodb://localhost:27017/shorturl')
    .then(() => {
        console.log('Connected to MongoDB');    
    });
app.use('/url', urlRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

