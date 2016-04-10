(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .factory("UserService", userService);
    function userService($http, $rootScope) {
        //   console.log("entered User wc_services client");

        var api= {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findUserById: findUserById,
            findFollowInfoForUserById: findFollowInfoForUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            getCurrentUserId: getCurrentUserId,

        };

        return api;

        function createUser(user) {
            console.log("entered the createuser in service of client");
            return $http.post("/api/project/user", user);
        };

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        };

        function updateUser(userId, user) {
            console.log("entered the updateUser function of client service");
            return $http.put("/api/project/user/" + userId, user);
        };

        function findUserByCredentials(username, password) {
            console.log(username+" - "+password);
            console.log("entered find User by credentials in user wc_services client");
            return $http.get("/api/project/user?username="
                +username+"&password=" +password);
        };

        function findAllUsers() {
            var users;
            users = $http.get("/api/project/user");
            return users;
        };

        function findUserById(userId){
            return $http.get("/api/project/user/" + userId);

        };

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+ username);
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

        function findFollowInfoForUserById(userId){
            return $http.get("/api/project/user/"+ userId +"/follow");
        };
    }
})();