var mongoose = require("mongoose");

module.exports = function() {
    var userSchema = new mongoose.Schema({

        username: String,
        password: String,
        firstName: String,
        lastName: String,
        roles:[String],
        emails: [String],
        phones: [String]
    }, {collection: "user"});

    return userSchema;
};