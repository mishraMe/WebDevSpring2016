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

        var postTemplate =
        {
            "_id": null, "title": null,
            "tag": ["Story", "Poem", "Script"] ,  "type": "private",
            "roles": ["user"],
            "userId": null, "username": "",
            "content":null
        }

        function init(){
        }
        init();

        function createPost(){
            vm.currentUser = UserService.getCurrentUser();
            PostService
                .createPostForUser(vm.currentUser._id, postTemplate)
                .then(function(response)
                {
                    vm.post = response.data;
                    console.log("response is");
                    console.log(response);
                    PostService.setCurrentPost(response.data);
                    $location.url("/editPost");
                });
        };


    }
})();