var mongoose = require("mongoose");
var fieldSchema = require("./field.schema.server.js")(mongoose);

module.exports = function() {
    var formSchema = new mongoose.Schema({

        userId: String,
        title: String,
        fields: [fieldSchema],
        created: Date,
        updated: Date
    }, {collection: "form"});

    return formSchema;
};