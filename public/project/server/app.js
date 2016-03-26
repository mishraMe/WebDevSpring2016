module.exports = function(app){
    var userModel = require("./wc_models/user.model.server.js")(app);
    var postModel = require("./wc_models/post.model.server.js")(app);

    var userService = require("./wc_services/user.service.server.js")(app, userModel);
    var postService = require("./wc_services/post.service.server.js")(app, postModel);
}