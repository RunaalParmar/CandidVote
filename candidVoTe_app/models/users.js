const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    uid: String,
    authLevel: String,
    email: String,
    username: String,
    orgName: String,
    hash: String,
    salt: String,
});

module.exports = {
    User: mongoose.model('users', userModel)
};