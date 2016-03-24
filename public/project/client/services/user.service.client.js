//user.service.js
(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .factory("UserService", userService);
    function userService($rootScope) {
        var currentUsers=[];
        var api= {

            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            getAllUsers: getAllUsers,
            createUserInTable: createUserInTable,
            deleteUserInTable: deleteUserInTable,
            updateUserInTable:updateUserInTable
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
        }

        function setCurrentUser(user){
            $rootScope.currentUser= user;
        }

        function getCurrentUser(){
            return $rootScope.currentUser;
        }

        function getAllUsers(){
            return api.currentUsers;
        }

        function createUserInTable(user, callback){

            var newUser;
            newUser = {
                "_id": (new Date).getTime(),
                "firstName": user.firstName,
                "lastName":  user.lastName,
                "username":  user.username,
                "password":  user.password,
                "roles":user.roles,
                "email":user.email
            };
            console.log(newUser);
            api.currentUsers.push(newUser);
            callback(newUser);
        }
        function deleteUserInTable(userId, callback){
            var deleteUser;
            for (var j in api.currentUsers) {

                if (api.currentUsers[j]._id == userId) {
                    deleteUser = api.currentUsers[j];
                    api.currentUsers.splice(j, 1);
                }
            }
            callback(api.currentUsers);
        }
        function updateUserInTable(userId, user, callback){
            var updateUser = api.findUserById(userId);
            console.log(updateUser);
            if (updateUser != null) {
                updateUser.firstName = user.firstName;
                updateUser.lastName = user.lastName;
                updateUser.password = user.password;
                updateUser.roles = user.roles;
                updateUser.email = user.email;
                callback(updateUser);
            } else {
                console.log("else condition fired");
                callback();
            }
        }
    }
})();