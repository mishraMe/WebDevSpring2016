var mongoose = require("mongoose");

module.exports = function() {
    var reviewSchema = new mongoose.Schema({

        "postId": String,
        "title":  String,
        "likeState": {type: String, enum: ['like', 'unlike'], default: 'like'},
        "likes": [String],
        "comments": [{username: String, value: String}],
    }, {collection: "review"});

    return reviewSchema;
};