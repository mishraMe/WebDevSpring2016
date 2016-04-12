var mongoose = require("mongoose");

module.exports = function() {
    var reviewSchema = new mongoose.Schema({

        "postId": String,
        "title": String,
        "likes": Number,
        "comments": String,
        "usersLiked": [String],
        "usersCommented": [String]
    }, {collection: "review"});

    return reviewSchema;
};