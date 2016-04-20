//header.controller.js
(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("HeaderController", headerController);
    function headerController($scope,$rootScope, $location, UserService,PostService){
        console.log("header controller hey!");

        var vm = this;
        $scope.$location = $location;
        $scope.logout = logout;
        var postTemplate;
        $scope.createPost = createPost;
        function logout()
        {
            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }



        function createPost(){

            UserService.getCurrentUser()
                .then(function(response){
                    var currentUser;
                    var currentUserId;
                    vm.currentUser = response.data;
                    currentUser = vm.currentUser;
                    currentUserId = vm.currentUser._id;

                    postTemplate =   {
                        "title": null,
                        "tag": [] ,  "type": "private",
                        "roles": ["user"],
                        "userId": currentUserId, "username": currentUser.username,
                        "content":null
                    }
                    PostService
                        .createPostForUser(currentUserId, postTemplate)
                        .then(function(response)
                        {
                            vm.post = response.data;
                            console.log("vm.post from sidebar is ");
                            console.log(vm.post);
                            PostService.setCurrentPost(vm.post);
                            $location.url("/editPost");
                        });
                });
        };

    }
})();