var mongoose = require("mongoose");

module.exports = function() {
    var reviewSchema = new mongoose.Schema({

        "postId": String,
        "title":  String,
        "likes": [String],
        "comments": [{username: String, value: String}],
    }, {collection: "review"});

    return reviewSchema;
};