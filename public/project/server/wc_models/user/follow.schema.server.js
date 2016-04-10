var mongoose = require("mongoose");

var userSchema = require("./user.schema.server.js")(mongoose);

module.exports = function() {
    var followSchema = new mongoose.Schema({

        "userId": Number,
        "username": String,
        "followers": [userSchema],
        "following": [userSchema]
    }, {collection: "follow"});

    return followSchema;
};