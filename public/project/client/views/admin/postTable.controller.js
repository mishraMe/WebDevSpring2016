//post.controller.js
(function(){
    "use strict";
    angular.module("WritersClubApp")
        .controller("PostTableController", postTableController);

    function postTableController(PostService){

        var vm = this;
        //variables :
        vm.error=null;
        vm.message= null;
        vm.selectedPost= null;
        vm.createPost= createPost;
        vm.deletePost = deletePost;
        vm.updatePost = updatePost;
        vm.selectPost = selectPost;
        vm.postTable= PostService.getAllPosts();

        // functions

        function createPost(post){
            function callback (response) {
                if (post == null) {
                    vm.message = "Please enter a post name";
                } else {
                    vm.postTable = PostService.getAllPosts();
                }
            }
            PostService.createPostInTable
            (post, callback);
            vm.post = null;
        }

        function deletePost($index){
            //function is responsible for deleting a post by the index value
            var postsAfterDeletion=[];
            var callback=
                function(response){
                    postsAfterDeletion= response;
                    vm.postTable = PostService.getAllPosts();
                    vm.error = null;
                };
            PostService.deletePostInTable
            (vm.postTable[$index]._id, callback);
        }

        function updatePost(newPost){

            //function is responsible for updating selected post to the new post's value
            if(!newPost){
                vm.message = "Please enter updates";
            }
            var renewedPost = {
                title: newPost.title,
                username: newPost.username,
                tag: newPost.tag,
                type: newPost.type,
            };
            function callback (response){
                console.log(response);
                if(vm.post.title == null){
                    vm.error = "Post name cannot be empty";
                }else {
                    vm.postTable= PostService.getAllPosts();
                    vm.error=null;
                }
            };
            PostService.updatePostInTable(vm.post._id, renewedPost,callback);
            vm.post=null;
        }

        function selectPost($index){
            // console.log("hello select post");
            //function is responsible for selecting a post to edit
            vm.post = {
                _id: vm.postTable[$index]._id,
                title: vm.postTable[$index].title,
                username: vm.postTable[$index].username,
                tag: vm.postTable[$index].tag,
                type: vm.postTable[$index].type
            };
        }
    }
})();
