(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .factory("UserService", userService);
    function userService($http, $rootScope) {
        //   console.log("entered User wc_services client");

        var api= {

            //functions to find Users
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findUserById: findUserById,

            //crud operations
            login: login,
            register: register,
            logout: logout,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            getCurrentUserId: getCurrentUserId,

            //funcitons related to follow funcitonality
            //findFollowInfoForUserById: findFollowInfoForUserById,
            addUserToFollowers: addUserToFollowers,
            removeUserFromFollowers : removeUserFromFollowers,
            addUserToFollowing: addUserToFollowing,
            removeUserFromFollowing : removeUserFromFollowing

        };

        return api;

        function login(user) {
            console.log("entered the login in service of client");
            return $http.post("/api/project/login", user);
        }


        function register(user) {
            console.log("entered the register in service of client");
            return $http.post("/api/project/register", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function createUser(user) {
            console.log("entered the createUser in service of client");
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
            return $http.get("/api/project/loggedin");
        }
        function getCurrentUserId(){
            return $rootScope.currentUser._id;
        };


        function addUserToFollowers(username, user){
            console.log("addUserToFollowers in client service");
            return $http.put("/api/project/follow/follower/"+ username, user);
        }

        function addUserToFollowing(username, user){
            console.log("addUserToFollowings in client service");
            return $http.put("/api/project/follow/following/"+ username, user);
        }

        function removeUserFromFollowers(username, user){
            console.log("removeUserFromFollowers in client service");
            return $http.put("/api/project/unfollow/follower/"+ username, user);
        }

        function removeUserFromFollowing(username, user){
            console.log("removeUserFromFollowing in client service");
            return $http.put("/api/project/unfollow/following/"+ username, user);
        }
    }

})();