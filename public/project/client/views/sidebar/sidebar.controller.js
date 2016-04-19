//sidebar.controller.js
(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("SidebarController",sidebarController);
    function sidebarController($scope, $location, PostService, UserService){
        var vm = this;

        $scope.createPost = createPost;
        var currentUser;
        var currentUserId;
        vm.$location = $location;
        console.log(vm.currentUser);
        var postTemplate;

        function init(){
           UserService
               .getCurrentUser()
               .then(function(response){
                   vm.currentUser = response.data;
                   currentUser = vm.currentUser;
                   currentUserId = vm.currentUser._id;
                   delete vm.currentUser._id;
               })
        }
        init();

        function createPost(){

            UserService.getCurrentUser()
                .then(function(response){
                    vm.currentUser = response.data;
                    currentUser = vm.currentUser;
                })

            postTemplate =   {
                "title": null,
                "tag": [] ,  "type": "private",
                "roles": ["user"],
                "userId": currentUser.Id, "username": currentUser.username,
                "content":null
            }
            PostService
                .createPostForUser(currentUserId, postTemplate)
                .then(function(response)
                {
                    vm.post = response.data;
                    PostService.setCurrentPost(vm.post);
                    $location.url("/editPost");
                });
        };


    }
})();