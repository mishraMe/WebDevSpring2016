(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);
    function userService($http, $rootScope) {
        console.log("entered User service client");

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
            console.log(username+" - "+password);
            console.log("entered find User by credentials in user service client");
            return $http.get("/api/assignment/user?username="
                +username+"&password=" +password);
        };

        function findAllUsers() {
            var users;
            users = $http.get("/api/assignment/user");
            return users;
        };

        function createUser(user) {
           return $http.post("/api/assignment/user", user);
        };

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        };

        function updateUser(userId, user) {
            console.log("entered UpdateUser in client service");
            console.log(userId);
            console.log(user);
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