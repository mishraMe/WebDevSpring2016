//Post.controller.js
(function(){
    "use strict";
    angular.module("WritersClubApp")
        .controller("PostController", postController);

    function postController(UserService, PostService){

        var vm = this;
        //variables :
        vm.error=null;
        vm.message= null;
        vm.selectedPost= null;
        vm.deletePost = deletePost;
        vm.updatePost = updatePost;
        vm.selectPost = selectPost;

        function init(){
            vm.currentUser = UserService.getCurrentUser();
            if(vm.currentUser){
                vm.myPosts=PostService.findAllPostsForUser(vm.currentUser._id);
            }
            vm.allPosts=PostService.getAllPosts();
        }
        init();

        function deletePost(post){
            var formsAfterDeletion=[];
            PostService
                .deletePostById(post._id)
                .then(function(response){
                    PostService
                        .findAllFormsForUser(vm.currentUser._id)
                        .then(function(resp){
                            vm.post = null;
                            vm.error = null;
                            location.url("#/myPosts");
                        });
                });
        }

        function updatePost(newPost){
            //function is responsible for updating selected post to the new post's value
            var renewedPost = newPost;
            if(vm.post._id == null){
                vm.error = "Post name cannot be empty";
            }
            PostService
                .updatePostById(vm.post._id, renewedPost)
                .then(function(resp){
                    vm.error = null;
                    vm.post = resp;
                    $location.url("#/post/{{resp.data._id}}");
                });

        }

        function selectPost($index){
            vm.post = {
                _id: vm.posts[$index]._id,
                title: vm.posts[$index].title,
                userId: vm.posts[$index].userId
            };
        }


    }

})();
