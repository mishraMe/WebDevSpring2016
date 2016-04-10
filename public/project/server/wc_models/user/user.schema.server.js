var mongoose = require("mongoose");

module.exports = function() {
    var userSchema = new mongoose.Schema({

        "firstName":String,
        "lastName": String,
        "username": String,
        "password": String,
        "roles":   [String],
        "email":    String,
    }, {collection: "user"});

    return userSchema;
};