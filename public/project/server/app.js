module.exports = function(app, db, mongoose){
    var userModel = require("./wc_models/user/user.model.server.js")(app, db, mongoose);
    var postModel = require("./wc_models/post/post.model.server.js")(app, db, mongoose);

    var userService = require("./wc_services/user.service.server.js")(app, userModel);
    var postService = require("./wc_services/post.service.server.js")(app, postModel);
}