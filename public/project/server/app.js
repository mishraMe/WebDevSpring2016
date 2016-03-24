module.exports = function(app){
    var userModel = require("./models/user.model.server.js")(app);
    var formModel = require("./models/post.model.server.js")(app);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/post.service.server.js")(app, formModel);
}