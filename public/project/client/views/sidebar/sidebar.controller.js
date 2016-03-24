//sidebar.controller.js
(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("SidebarController",sidebarController);
    function sidebarController($location, PostService, UserService){
        var vm = this;

        vm.createPost = createPost;


        var postTemplate =
        {
            "_id": null, "title": "Title",
            "tag": ["Tag1", "Tag2", "Tag3"] ,  "type": "private",
            "userId": null, "username":"username",
            "content": "Write Here!"
        }

        function init(){
            vm.currentUser = UserService.getCurrentUser();
            console.log(vm.currentUser);
        }
        init();

        function createPost(){
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