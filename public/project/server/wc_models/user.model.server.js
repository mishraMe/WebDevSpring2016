var mockUsers = require("./user.mock.json");
var mockFollows = require("./follow.mock.json");

module.exports = function(app) {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        //find all follower and following info for a user
        findAllFollowInfoForUserByUserId: findAllFollowInfoForUserByUserId
    };
    return api;

    console.log("entered in user.model.server.js");
    //createUser function
    function createUser(user) {
        console.log("entered createUser method of user wc_models in server");
        user._id = (new Date).getTime();
        mockUsers.push(user);
        return user;
    };

    //findAllUsers function
    function findAllUsers() {
        return mockUsers;
    };

    //findUserById function
    function findUserById(userId) {
        for (var index in mockUsers) {
            if (mockUsers[index]._id == userId) {
                return mockUsers[index];
                break;
            }
        }
        return null;
    };

    //updateUser function
    function updateUser(userId, user) {
        console.log("entered updateUser in wc_models")
        console.log("user in user wc_models server js")
        console.log(user);
        console.log("mock users are:");
        console.log(mockUsers);
        for (var index in mockUsers) {
            if (mockUsers[index]._id == userId) {
                mockUsers[index] = user;

            }
        }
    };

    //deleteUser function
    function deleteUser(userId) {
        for (var index in mockUsers) {
            if (mockUsers[index]._id === userId) {
                mockUsers.splice(index, 1);
                break;
            }
        }
    };


    //findUserByUsername function
    function findUserByUsername(username) {
        console.log("find user by username in server model");
        var user;
        for (var index in mockUsers) {
            user = mockUsers[index];
            if (user.username == username) {
                return user;
                console.log("user in user model is");
                console.log(user);
                break;
            }
        }
        console.log("returning null");
        return null;
    };

    //findUserByCredentials function
    function findUserByCredentials(credentials) {
        var user
        for (var index in mockUsers) {
            user = mockUsers[index];
            if (user.username === credentials.username
                && user.password === credentials.password)
            {
                return user;
                break;
            }
        }
        return null;
    };


    //functions for finding followers and following

    function findAllFollowInfoForUserByUserId(userId){
        for(var index in mockFollows){
            if(mockFollows[index].userId == userId){
                return mockFollows[index];
            }
        }
        return null;
    }

}