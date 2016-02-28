(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);
    function userService($rootScope, $scope, $location) {
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
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser
        };
        return api;

        function findUserByCredentials(username, password, callback) {
            for (var i = 0; i <= currentUsers.length; i++) {

                if (currentUsers[i].username == username
                    && currentUsers[i].password == password) {
                    user = currentUsers[i];
                    callback(user);
                }else{
                    callback();
                }
            }
        }

        function findAllUsers(callback) {

            var users = currentUsers;
            return callback

           callback();

        }

        function createUser(user, callback) {

            var newUser;
            newUser = {
                "_id": user.id,
                "firstName": user.firstName,
                "lastName":  user.lastName,
                "username":  user.username,
                "password":  user.password,
                "roles":     user.role
            };
             callback();

        }

        function deleteUserById(userId, callback) {

            var deleteUser;
            for (var j = 0; j <= currentUsers.length; j++) {

                if (currentUsers[j]._id == userId) {
                    deleteUser = currentUsers[j];
                }
            }
            (callback);
        }

        function updateUser(userId, user, callback) {

            var updateUser;

            for (var k = 0; k <= currentUsers.length; k++) {

                if (currentUsers[k]._id == userId) {
                    updateUser = currentUsers[k];
                }
            }
            updateUser._id = user.id;
            updateUser.firstName = user.firstName;
            updateUser.lastName = user.lastName;
            updateUser.username = user.username;
            updateUser.password = user.password;
            updateUser.roles = user.roles;

            (callback);
        }
        function setCurrentUser(user){
            $rootScope.currentUser= user;
        }

        function getCurrentUser(){
            return $rootScope.currentUser;
        }
    }
})();