 var mongoose = require("mongoose");

module.exports = function() {
    var userSchema = new mongoose.Schema
    ({

        "firstName":String,
        "lastName": String,
        "username": String,
        "password": String,
        "roles":   [String],
        "email":    String,
        "DOB": String,
        "gender":  {type: String, enum:['MALE', 'FEMALE', 'CHOOSE NOT TO DISCLOSE'], default: 'CHOOSE NOT TO DISCLOSE'}
    }, {collection: "user"});

    return userSchema;
};