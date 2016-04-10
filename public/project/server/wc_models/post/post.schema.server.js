var mongoose = require("mongoose");

module.exports = function() {
    var postSchema = new mongoose.Schema({

        "title": String,
        "tag": [String],
        "type": {type: String, enum:['public', 'private'], default:'private'},
        "userId": String,
        "username": String,
        "content": String,
    }, {collection: "post"});

    return postSchema;
};