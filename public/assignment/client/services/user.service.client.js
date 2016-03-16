(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);
    function userService($rootScope) {
        var currentUsers=[];
        var api= {
            currentUsers: [
                {
                    "_id": 123,
                    "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ],
            findUserByCredentials: findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            getCurrentUserId: getCurrentUserId
        };

        return api;

        function findUserByCredentials(username, password, callback) {
            var user;
            for (var i in api.currentUsers) {
                if (api.currentUsers[i].username == username
                    && api.currentUsers[i].password == password) {
                    user= api.currentUsers[i];
                    callback(user);
                    break;
                }
            }
            callback(null);
        }

        function findAllUsers(callback) {

            var users = api.currentUsers;
            callback(users);

        }

        function createUser(user, callback) {

          api.currentUsers.pop();

            var newUser;
            newUser = {
                "_id": (new Date).getTime(),
                "firstName": user.firstName,
                "lastName":  user.lastName,
                "username":  user.username,
                "password":  user.password,
            };
            console.log(newUser);
            api.currentUsers.push(newUser);
             callback(newUser);
        }

        function deleteUserById(userId, callback) {

            var deleteUser;
            for (var j in api.currentUsers) {

                if (api.currentUsers[j]._id == userId) {
                    deleteUser = api.currentUsers[j];
                    api.currentUsers.splice(j, 1);
                }
            }
            callback(api.currentUsers);
        }

        function updateUser(userId, user, callback) {
            var updateUser = api.findUserById(userId);
            console.log(updateUser);
            if (updateUser != null) {
                updateUser.firstName = user.firstName;
                updateUser.lastName = user.lastName;
                updateUser.password = user.password;
                callback(updateUser);
            } else {
                console.log("else condition fired");
               callback();
            }
        }

        function findUserById(userId){

            for(var l in api.currentUsers){
                if(api.currentUsers[l]._id == userId){
                    return api.currentUsers[l];
                }
            }
            return null;
        };

        function setCurrentUser(user){
            $rootScope.currentUser= user;
        };

        function getCurrentUser(){
            return $rootScope.currentUser;
        };
        function getCurrentUserId(){
            console.log($rootScope.currentUser._id);
            return $rootScope.currentUser._id;
        };

        function findUserByUsername(username){
            for(var x in api.currentUsers){
                if(username==api.currentUsers[x].username){
                    return username;
                    break;
                }
            }
            return;
        };
    }
})();