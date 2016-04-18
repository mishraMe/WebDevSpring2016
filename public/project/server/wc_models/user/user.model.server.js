module.exports = function(app, db, mongoose) {

    var UserSchema = require('./user.schema.server.js')(mongoose);
    // create user model from schema
    var UserModel = mongoose.model("User", UserSchema);

    var api = {

        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,

        //find all follower and following info for a user
        //findAllFollowInfoForUserByUserId: findAllFollowInfoForUserByUserId,
        addUserToFollowers: addUserToFollowers,
        removeUserFromFollowers: removeUserFromFollowers,

        addUserToFollowing: addUserToFollowing,
        removeUserFromFollowing: removeUserFromFollowing

    };
    return api;

    console.log("entered in user.model.server.js");
    //createUser function
    function createUser(user) {
        console.log("entered createUser method of user wc_models in server");
        return UserModel.create(user);
    };

    //updateUser function
    function updateUser(userId, user) {
        return UserModel.update({_id: userId},{$set: user});
    };

    //deleteUser function
    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    };


    //findUserByUsername function
    function findUserByUsername(username) {
        console.log("ENTERED findUserByUsername");
        return UserModel.findOne({username: username});

    };

    //findUserByCredentials function
    function findUserByCredentials(credentials) {
        console.log("entered findUserByCredentials");
        console.log("entered in user model");
        var username= credentials.username;
        var password= credentials.password;
        return UserModel.findOne({username: username, password: password});
    };


    //findAllUsers function
    function findAllUsers() {
        console.log("entered findAllUsers in model");
        return UserModel.find();
    };

    //findUserById function
    function findUserById(userId) {
        console.log("entered findUserById");
        return UserModel.findById(userId);
    };

    // get mongooseModel
    function getMongooseModel() {
        return UserModel;
    }

    //functions for finding followers and following
    function findAllFollowInfoForUserByUserId(userId){
       var user = UserModel.findOne({"user": userId});
        var followInfo =
        {
            "followers": [user.followers],
            "following": [user.following]
        }
        return followInfo;
    }

    function addUserToFollowers(followeeUsername, follower) {

        console.log("entered the addUserToFollowers");
       return UserModel
            .findOne({username: followeeUsername})
            .then(function (userBeingFollowed){
                console.log("entered the then of addUserfollow");
                userBeingFollowed.followers.push(follower.username);
                console.log(userBeingFollowed);
                return userBeingFollowed.save();
            });
        }

    function addUserToFollowing(followerUsername, following) {

        console.log("entered the addUserToFollowing");
        return UserModel
            .findOne({username: followerUsername})
            .then(function (userFollowing){
                console.log("entered the then of addUserfollowing");
                userFollowing.following.push(following.username);
                console.log(userFollowing);
                return userFollowing.save();
            });
    }

    function removeUserFromFollowers(followeeUsername, follower) {

        console.log("entered the removeUserFromFollowers");
        return UserModel
            .findOne({username: followeeUsername})
            .then(function (userBeingFollowed){
                console.log("entered the delete user function of model");
                userBeingFollowed.followers.remove(follower.username);
                return userBeingFollowed.save();
            });
    }

    function removeUserFromFollowing(followerUsername, following) {

        console.log("entered the removeUserFromFollowing");
        console.log(following.username);
        return UserModel
            .findOne({username: followerUsername})
            .then(function (userFollowing){
                console.log("entered the then of removeUserFromfollowing");
                userFollowing.following.remove(following.username);
                console.log(userFollowing);
                return userFollowing.save();
            });
    }

}