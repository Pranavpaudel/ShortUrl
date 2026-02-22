const mosgoose = require('mongoose');

async function connectToMongoDB(url) {
    return mosgoose.connect(url);
}

module.exports = {
    connectToMongoDB,
};  
