(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);
    function userService($http, $rootScope) {

        var api= {
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

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username="
                +username+"&password=" +password);
        };

        function findAllUsers() {
            var users;
            users = $http.get("/api/assignment/user");
            return users;
        };

        function createUser(user) {
          api.currentUsers.pop();
           return $http.post("/api/assignment/user", user);
        };

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        };

        function updateUser(userId, user) {
           return $http.put("/api/assignment/user/" + userId, user);
        };

        function findUserById(userId){
            return $http.get("/api/assignment/user/" + userId);

        };

        function setCurrentUser(user){
            $rootScope.currentUser= user;
        };

        function getCurrentUser(){
            return $rootScope.currentUser;
        };
        function getCurrentUserId(){
            return $rootScope.currentUser._id;
        };

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+ username);
        };
    }
})();