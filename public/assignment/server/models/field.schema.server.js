var mongoose = require("mongoose");

module.exports = function() {
    var fieldSchema = new mongoose.Schema({

        label: String,
        type: {type: String, enum:['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'], default: 'TEXT'},
        palceholder: String,
        options:[{label:String, value:String}]
    }, {collection: "field"});

    return fieldSchema;
};