(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);
    function userService($http, $rootScope) {

        var api= {
            login: login,
            logout: logout,
            register: register,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            getCurrentUserId: getCurrentUserId
        };

        return api;

        function createUser(user) {
            console.log("entered the createuser in service of client");
           return $http.post("/api/assignment/admin/user", user);
        };

        function deleteUser(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        };

        function updateUser(userId, user) {
            console.log("entered the updateUser function of client service");
           return $http.put("/api/assignment/admin/user/" + userId, user);
        };

        function findUserById(userId){
            return $http.get("/api/assignment/admin/user/" + userId);

        };

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+ username);
        };


        function findUserByCredentials(username, password) {
            console.log(username+" - "+password);
            console.log("entered find User by credentials in user wc_services client");
            return $http.get("/api/assignment/user?username="
                +username+"&password=" +password);
        };

        function findAllUsers() {
            var users;
            users = $http.get("/api/assignment/admin/user");
            return users;
        };

        function setCurrentUser(user){
            $rootScope.currentUser= user;
        };

        function getCurrentUser(){
            return $http.get("/api/assignment/loggedin");
        };
        function getCurrentUserId(){
            return $rootScope.currentUser._id;
        };

        function login(user){
            return $http.post("/api/assignment/login", user);
        };

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function register(user){
            console.log(user);
            return $http.post("/api/assignment/register", user);
        }
    }
})();