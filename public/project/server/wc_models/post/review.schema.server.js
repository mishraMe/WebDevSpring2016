var mongoose = require("mongoose");

var postSchema = require("./post.schema.server.js")(mongoose);

module.exports = function() {
    var reviewSchema = new mongoose.Schema({

        "postId": Number,
        "title": String,
        "rating": Number,
        "comments": String
    }, {collection: "review"});

    return reviewSchema;
};