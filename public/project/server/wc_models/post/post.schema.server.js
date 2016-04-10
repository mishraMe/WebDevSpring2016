var mongoose = require("mongoose");

var userSchema = require("./../user/user.schema.server.js")(mongoose);

module.exports = function() {
    var postSchema = new mongoose.Schema({

        "title": String,
        "tag": [String],
        "type": {type: String, enum:['PUBLIC', 'PRIVATE'], default: 'PRIVATE'},
        "userId": Number,
        "username": String,
        "content": String,
    }, {collection: "post"});

    return postSchema;
};