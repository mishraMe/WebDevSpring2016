var mockUsers = require("./user.mock.json");

module.exports = function(app) {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    //createUser function
    function createUser(user) {
        var newUserId = (new Date).getTime();
        var newUser =
        {
            "_id": newUserId,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "username": user.username,
            "password": user.password
        };

        mockUsers.push(newUser);
        return mockUsers;

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
        console.log("entered updateUser in model")
        console.log("user in user model server js")
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
        var user;
        for (var index in mockUsers) {
            user = mockUsers[index];
            if (user.username === username) {
                return user;
                break;
            }
        }
        return null;
    };

    //findUserByCredentials function
    function findUserByCredentials(credentials) {
        console.log("entered in user model");
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
}