//sidebar.controller.js
(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("SidebarController",sidebarController);
    function sidebarController($location, PostService, UserService){
        var vm = this;

        vm.createPost = createPost;
        vm.currentUser = UserService.getCurrentUser();
        console.log(vm.currentUser);


        var postTemplate =
        {
            "_id": null, "title": "Title",
            "tag": ["Tag1", "Tag2", "Tag3"] ,  "type": "private",
            "roles": ["user"],
            "userId": null, "username":"username",
            "content": "Write Here!"
        }

        function init(){
        }
        init();

        function createPost(){
            vm.currentUser = UserService.getCurrentUser();
            PostService
                .createPostForUser(vm.currentUser._id,postTemplate)
                .then(function(response)
                {
                    vm.post = response.data;
                    $location.url("#/post/{{response.data._id}}");
                });
        };


    }
})();