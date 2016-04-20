//post.controller.js
(function(){
    "use strict";
    angular.module("WritersClubApp")
        .controller("PostTableController", postTableController);

    function postTableController(PostService, UserService, $location){

        var vm = this;
        //variables :
        vm.error=null;
        vm.message= null;
        vm.selectedPost= null;
        vm.$location = $location;
        vm.createPost= createPost;
        vm.deletePost = deletePost;
        vm.updatePost = updatePost;
        vm.selectPost = selectPost;
        vm.showUsersLiked = showUsersLiked;
        vm.showWriter = showWriter;
        vm.viewPost = viewPost;

        // functions
        function init() {
            PostService
                .getAllPosts()
                .then(function(resp){
                    vm.postTable = resp.data;
                })
        }
        init();

        function createPost(post){
            if (post.title == null) {
                vm.message = "Please enter a title";
                init();
            }else{
                PostService
                    .createPostForUser(post)
                    .then(function(resp){
                        init();
                    })
                vm.post = null;
            }
        }
        function deletePost(post){
            //function is responsible for deleting a post by the index value
            var PostsAfterDeletion=[];
            var postId = post._id;
            PostService
                .deletePostById(postId)
                .then(function(response){
                    console.log("post deleted sucessfully");
                    init();
                });
        }

        function updatePost(newPost){
            console.log("entered the update post and updated new post is ");
            console.log(newPost);
            var postId = vm.post._id;
            //function is responsible for updating selected post to the new post's value
            if(!newPost){
                vm.message = "Please enter updates";
            }
            var renewedPost = {
                title: newPost.title,
                tag: newPost.tag,
                username: newPost.username,
                type: newPost.type,
            };

            if(postId == null){
                vm.message = "post not in the database";
            }
            PostService
                .updatePostById(postId, renewedPost)
                .then(
                    function (response){
                        init();
                        vm.post = null;
                    });

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


        function showWriter(post){
            console.log("post is");
            console.log(post);
            UserService
                .findUserByUsername(post.username)
                .then(function(response){
                    vm.currentUser = response.data;
                    $location.url("/account/"+ post.username);
                })
        }


        function viewPost(post){
            PostService
                .setCurrentPost(post);
            vm.post = post;
            console.log(vm.post);
            $location.url("/viewPost");
        };


        function showUsersLiked(post){
            PostService.setCurrentPost(post);
            vm.post = post;
            $location.url("/post/"+ post._id +"/review/usersLiked");
        }

    }
})();
