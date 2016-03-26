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
        console.log("ENTERED ASSIGNEMNT USER MODEL");
        console.log("entered createUser method of user wc_models in server");
        user._id = (new Date).getTime();
        mockUsers.push(user);

        return mockUsers;

    };

    //findAllUsers function
    function findAllUsers() {
        console.log("ENTERED ASSIGNEMNT USER MODEL");
        return mockUsers;
    };

    //findUserById function
    function findUserById(userId) {
        console.log("ENTERED ASSIGNEMNT USER MODEL");
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
        for (var index in mockUsers) {
            if (mockUsers[index]._id == userId) {
              mockUsers[index] = user;

            }
        }
    };

    //deleteUser function
    function deleteUser(userId) {
        console.log("ENTERED ASSIGNEMNT USER MODEL");
        for (var index in mockUsers) {
            if (mockUsers[index]._id === userId) {
                mockUsers.splice(index, 1);
                break;
            }
        }
    };


    //findUserByUsername function
    function findUserByUsername(username) {
        console.log("ENTERED ASSIGNEMNT USER MODEL");
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
        console.log("ENTERED ASSIGNEMNT USER MODEL");
        console.log("entered in user wc_model");
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