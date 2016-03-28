//sidebar.controller.js
(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("SidebarController",sidebarController);
    function sidebarController($scope, $location, PostService, UserService){
        var vm = this;

        $scope.createPost = createPost;
        vm.currentUser = UserService.getCurrentUser();
        vm.$location = $location;
        console.log(vm.currentUser);
        var postTemplate;

        function init(){
        }
        init();

        function createPost(){

            vm.currentUser = UserService.getCurrentUser();

            postTemplate =   {
                "_id": null, "title": null,
                "tag": ["Story", "Poem", "Script"] ,  "type": "private",
                "roles": ["user"],
                "userId": vm.currentUser._id, "username": vm.currentUser.username,
                "content":null
            }
            PostService
                .createPostForUser(vm.currentUser._id, postTemplate)
                .then(function(response)
                {
                    vm.post = response.data;
                    console.log("created post is");
                    console.log(vm.post);
                    PostService.setCurrentPost(vm.post);
                    $location.url("/editPost");
                });
        };


    }
})();