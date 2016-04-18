//sidebar.controller.js
(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("SidebarController",sidebarController);
    function sidebarController($scope, $location, PostService, UserService){

        $scope.createPost = createPost;
        $scope.$location = $location;
        var postTemplate;

        function init(){
            UserService
                .getCurrentUser()
                .then(function(response){
                    $scope.currentUser = response.data;
                });
        }
        init();

        function createPost(){

            UserService
                .getCurrentUser()
                .then(function(response){
                    $scope.currentUser = response.data;

            postTemplate =   {
                "title": null,
                "tag": [] ,  "type": "private",
                "roles": ["user"],
                "userId": $scope.currentUser._id, "username": $scope.currentUser.username,
                "content":null
            }
            PostService
                .createPostForUser($scope.currentUser._id, postTemplate)
                .then(function(response)
                {
                    $scope.post = response.data;
                    PostService.setCurrentPost($scope.post);
                    $location.url("/editPost");
                });
                });
        };


    }
})();