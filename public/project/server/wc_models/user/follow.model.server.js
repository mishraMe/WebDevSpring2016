module.exports = function(app) {

    var FollowSchema = require('./follow.schema.server.js')(mongoose);

    var FollowModel = mongoose.model("Follow", FollowSchema);

    var api = {

        //find all follower and following info for a user
        findAllFollowInfoForUserByUserId: findAllFollowInfoForUserByUserId
    };
    return api;

    //functions for finding followers and following
    function findAllFollowInfoForUserByUserId(userId){
       return FollowModel.findOne({"user": userId});
    }
}